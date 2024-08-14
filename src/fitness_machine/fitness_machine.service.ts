import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { FitnessMachineModel } from './entity/fitness_machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFitnessMachine } from './interface/fitness_machine.interface';
import { BodyPartEnum } from 'src/body_part/enum/body_part.enum';

@Injectable()
export class FitnessMachineService {
  constructor(
    @InjectRepository(FitnessMachineModel)
    private readonly fitnessMachineRepository: Repository<FitnessMachineModel>,
  ) {}

  async getFitnessMachineList(type: number): Promise<IFitnessMachine[]> {
    if (!Object.values(BodyPartEnum).includes(type)) {
      throw new BadRequestException('존재하지 않는 운동부위');
    }
    const fitnessMachineList = await this.fitnessMachineRepository.find({
      where: {
        body_part: {
          body_part_id: type,
        },
      },
    });
    return fitnessMachineList;
  }

  async findMachinesWithBodyPart() {
    return await this.fitnessMachineRepository
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
      .getMany();
  }
}
