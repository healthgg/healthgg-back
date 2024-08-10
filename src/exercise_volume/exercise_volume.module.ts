import { Module } from '@nestjs/common';
import { ExerciseVolumeController } from './exercise_volume.controller';
import { ExerciseVolumeService } from './exercise_volume.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseVolumeModel } from './entity/exercise_volume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseVolumeModel])],
  controllers: [ExerciseVolumeController],
  providers: [ExerciseVolumeService],
})
export class ExerciseVolumeModule {}
