import { Controller, Get } from '@nestjs/common';
import { ExerciseVolumeService } from 'src/exercise_volume/exercise_volume.service';
import { FoodService } from 'src/food/food.service';
import { MainService } from './main.service';
import { ExerciseVolumeBoardModel } from 'src/exercise_volume/entity/exercise_volume_board.entity';

@Controller('main')
export class MainController {
  constructor(
    private readonly exerciseVolumeService: ExerciseVolumeService,
    private readonly foodService: FoodService,
    private readonly mainService: MainService,
  ) {}

  @Get()
  async getMaindata() {
    const exerciseVolume = await this.exerciseVolumeService.getExerciseVolmes();
    //const food: foodModel[] = await this.foodService.getAllFoods(4);
    const foodBoardList = await this.foodService.getFoodBoardList();
    const totalvistor: number = await this.mainService.getTotlaVisitor();
    await this.mainService.incrementVisitor();

    return { totalvistor, foodBoardList, exerciseVolume };
  }
}
