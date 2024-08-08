import { Injectable } from '@nestjs/common';
import { FitnessMachineModel } from './entity/fitness_machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IfitnessMachine } from './interface/fitness_machine.interface';

@Injectable()
export class FitnessMachineService {
  constructor(
    @InjectRepository(FitnessMachineModel)
    private readonly fitnessMachineRepository: Repository<FitnessMachineModel>,
  ) {}

  async getFitnessMachineList(): Promise<IfitnessMachine[]> {
    const fitnessMachineList = await this.fitnessMachineRepository.find();

    return fitnessMachineList;
  }
}
