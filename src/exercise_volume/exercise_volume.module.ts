import { Module } from '@nestjs/common';
import { ExerciseVolumeController } from './exercise_volume.controller';
import { ExerciseVolumeService } from './exercise_volume.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseVolumeModel } from './entity/exercise_volume.entity';
import { ExerciseVolumeBoardModel } from './entity/exercise_volume_board.entity';
import { FitnessMachineModel } from 'src/fitness_machine/entity/fitness_machine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExerciseVolumeModel,
      ExerciseVolumeBoardModel,
      FitnessMachineModel,
    ]),
  ],
  controllers: [ExerciseVolumeController],
  providers: [ExerciseVolumeService],
  exports: [ExerciseVolumeService], // 다른 모듈에서 사용할 수 있도록 내보내기
})
export class ExerciseVolumeModule {}
