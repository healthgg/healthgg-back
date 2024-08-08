import { Module } from '@nestjs/common';
import { FitnessMachineController } from './fitness_machine.controller';
import { FitnessMachineService } from './fitness_machine.service';

@Module({
  controllers: [FitnessMachineController],
  providers: [FitnessMachineService],
})
export class FitnessMachineModule {}
