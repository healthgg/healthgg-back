import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FitnessMachineModel } from './entity/fitness_machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFitnessMachine } from './interface/fitness_machine.interface';
import { BodyPartEnum } from 'src/body_part/enum/body_part.enum';
import { CursorPageMetaDto } from 'src/food/cursor-page/cursor-page.meta.dto';
import { CursorPageDto } from 'src/food/cursor-page/cursor-page.dto';
import { CursorPageOptionsDto } from 'src/food/cursor-page/cursor-page-option.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class FitnessMachineService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(FitnessMachineModel)
    private readonly fitnessMachineRepository: Repository<FitnessMachineModel>,
    private readonly searchService: SearchService,
  ) {}

  async getFitnessMachineList(
    cursorPageOptionsDto: CursorPageOptionsDto,
    type: number,
  ) {
    let take = cursorPageOptionsDto?.take || 4;

    if (!Object.values(BodyPartEnum).includes(type)) {
      throw new BadRequestException('존재하지 않는 운동부위');
    }

    console.log(take);
    console.log(type);
    const [machines, total] = await this.fitnessMachineRepository
      .createQueryBuilder('fitness_machine')
      .leftJoinAndSelect('fitness_machine.body_part', 'body_part')
      .select([
        'fitness_machine.fitness_machine_id',
        'fitness_machine.finess_machine_imageurl',
        'fitness_machine.finess_machine_name',
        'fitness_machine.finess_machine_notice',
        'body_part.body_part_id',
        'body_part.body_part_type',
      ])
      .where(
        'body_part.body_part_type = :body_part_type AND fitness_machine.fitness_machine_id < :cursorId',
        {
          body_part_type: type,
          cursorId: cursorPageOptionsDto.cursorId,
        },
      )
      .orderBy('fitness_machine.fitness_machine_id', 'DESC')
      .take(take)
      .getManyAndCount();

    let hasNextData = true;
    let cursor: number;
    let firstDataWithNextCursor;

    const takePerScroll = cursorPageOptionsDto.take;
    const isLastScroll = total <= takePerScroll;
    const lastDataPerScroll = machines[machines.length - 1];
    const allFitnessMachine = await this.getAllFitnessMachines();

    if (isLastScroll) {
      hasNextData = false;
      cursor = null;
    } else {
      cursor = lastDataPerScroll.fitness_machine_id;
      const lastDataPerPageIndexOf = allFitnessMachine.findIndex(
        (data) => data.fitness_machine_id === cursor,
      );
      firstDataWithNextCursor = allFitnessMachine[lastDataPerPageIndexOf - 1];

      machines.push(firstDataWithNextCursor);
    }

    const cursorPageMetaDto = new CursorPageMetaDto({
      cursorPageOptionsDto,
      total,
      hasNextData,
      cursor,
    });

    return new CursorPageDto(machines, cursorPageMetaDto);
  }

  async getAllFitnessMachines() {
    const cacheMachines = await this.cacheManager.get('machines');
    if (!cacheMachines) {
      console.log('Cache Miss');
      const machines = await this.fitnessMachineRepository.find();
      await this.cacheManager.set('machines', JSON.stringify(machines), 604800);
      return machines;
    }
    return JSON.parse(await this.cacheManager.get('machines'));
  }

  async searchFitnessMachine(search) {
    return await this.searchService.searchFitness(search);
  }
}
