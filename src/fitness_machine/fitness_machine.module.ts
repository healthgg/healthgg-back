import { Module } from '@nestjs/common';
import { FitnessMachineController } from './fitness_machine.controller';
import { FitnessMachineService } from './fitness_machine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitnessMachineModel } from './entity/fitness_machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FitnessMachineModel])],
  controllers: [FitnessMachineController],
  providers: [FitnessMachineService],
})
export class FitnessMachineModule {}
