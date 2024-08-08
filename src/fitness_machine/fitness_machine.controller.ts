import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FitnessMachineService } from './fitness_machine.service';
import { IFitnessMachine } from './interface/fitness_machine.interface';

@Controller('fitness-machine')
export class FitnessMachineController {
  constructor(private readonly fitnessService: FitnessMachineService) {}

  @Get(':type')
  async getFitnessMachine(
    @Param('type', ParseIntPipe) type: number,
  ): Promise<IFitnessMachine[]> {
    return await this.fitnessService.getFitnessMachineList(type);
  }
}
