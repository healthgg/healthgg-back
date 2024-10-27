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

  //

  public async getFitnessMachineList(
    type: number,
  ): Promise<FitnessMachineModel[]> {
    // 리턴 타입 변경

    if (type !== 0 && !Object.values(BodyPartEnum).includes(type)) {
      throw new BadRequestException('존재하지 않는 운동부위');
    }

    const query = this.fitnessMachineRepository
      .createQueryBuilder('fitness_machine')
      .leftJoinAndSelect('fitness_machine.body_part', 'body_part')
      .select([
        'fitness_machine.fitness_machine_id',
        'fitness_machine.fitness_machine_imageurl',
        'fitness_machine.fitness_machine_name',
        'fitness_machine.fitness_machine_notice',
        'body_part.body_part_id',
        'body_part.body_part_type',
      ]);

    if (type !== 0) {
      query.andWhere('body_part.body_part_type = :body_part_type', {
        body_part_type: type,
      });
    }

    return await query.getMany();
  }

  public async getAllFitnessMachines() {
    const cacheMachines = await this.cacheManager.get('machines');
    if (!cacheMachines) {
      console.log('Cache Miss');
      const machines = await this.fitnessMachineRepository.find();
      await this.cacheManager.set('machines', JSON.stringify(machines), 604800);
      return machines;
    }
    return JSON.parse(await this.cacheManager.get('machines'));
  }

  public async searchFitnessMachine(search) {
    return await this.searchService.searchFitness(search);
  }
}
