import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { ExerciseVolumeModule } from 'src/exercise_volume/exercise_volume.module';
import { ExerciseVolumeService } from 'src/exercise_volume/exercise_volume.service';
import { ExerciseVolumeModel } from 'src/exercise_volume/entity/exercise_volume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from 'src/gateway/events.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseVolumeModel]),
    ExerciseVolumeModule,
    EventsGateway,
  ],
  controllers: [MainController],
  providers: [MainService, ExerciseVolumeService, EventsGateway],
})
export class MainModule {}
