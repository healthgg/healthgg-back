import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { ExerciseVolumeModule } from 'src/exercise_volume/exercise_volume.module';
import { ExerciseVolumeService } from 'src/exercise_volume/exercise_volume.service';
import { ExerciseVolumeModel } from 'src/exercise_volume/entity/exercise_volume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from 'src/gateway/events.gateway';
import { FoodService } from 'src/food/food.service';
import { foodModel } from 'src/food/entity/food.entity';
import { nutrientModel } from 'src/nutrient/entity/nutrient.entity';
import { SearchModule } from 'src/search/search.module';
import { FoodModule } from 'src/food/food.module';
import { visitor } from './entity/visitor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExerciseVolumeModel,
      foodModel,
      nutrientModel,
      visitor,
    ]),
    ExerciseVolumeModule,
    EventsGateway,
    SearchModule,
    FoodModule,
  ],
  controllers: [MainController],
  providers: [MainService, EventsGateway, FoodService],
})
export class MainModule {}
