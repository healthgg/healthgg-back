import { Module } from '@nestjs/common';
import { FitnessMachineController } from './fitness-machine.controller';
import { FitnessMachineService } from './fitness-machine.service';

@Module({
  controllers: [FitnessMachineController],
  providers: [FitnessMachineService]
})
export class FitnessMachineModule {}
