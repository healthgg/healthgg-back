import { Controller, Get } from '@nestjs/common';
import { ExerciseVolumeService } from 'src/exercise_volume/exercise_volume.service';
import { FoodService } from 'src/food/food.service';
import { EventsGateway } from 'src/gateway/events.gateway';
import { MainService } from './main.service';
import { ExerciseVolumeModel } from 'src/exercise_volume/entity/exercise_volume.entity';
import { foodModel } from 'src/food/entity/food.entity';

@Controller('main')
export class MainController {
  constructor(
    private readonly exerciseVolumeService: ExerciseVolumeService,
    private readonly foodService: FoodService,
    private readonly mainService: MainService,
  ) {}

  @Get()
  async getMaindata() {
    const exerciseVolume: ExerciseVolumeModel[] =
      await this.exerciseVolumeService.getExerciseVolmes();
    const food: foodModel[] = await this.foodService.getAllFoods(4);
    const totalvistor: number = await this.mainService.getTotlaVisitor();
    await this.mainService.incrementVisitor();

    return { totalvistor, food, exerciseVolume };
  }
}
