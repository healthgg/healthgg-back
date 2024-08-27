import { Module } from '@nestjs/common';
import { FitnessMachineController } from './fitness_machine.controller';
import { FitnessMachineService } from './fitness_machine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FitnessMachineModel } from './entity/fitness_machine.entity';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([FitnessMachineModel]), SearchModule],
  controllers: [FitnessMachineController],
  providers: [FitnessMachineService],
})
export class FitnessMachineModule {}
