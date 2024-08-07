import { Controller, Get } from '@nestjs/common';
import { FitnessMachineService } from './fitness_machine.service';

@Controller('fitness-machine')
export class FitnessMachineController {
  constructor(private readonly fitnessService: FitnessMachineService) {}

  @Get()
  async getFitnessMachine() {
    this.fitnessService;
  }
}
