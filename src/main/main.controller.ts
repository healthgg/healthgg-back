import { Controller, Get } from '@nestjs/common';
import { ExerciseVolumeService } from 'src/exercise_volume/exercise_volume.service';
import { FoodService } from 'src/food/food.service';
import { EventsGateway } from 'src/gateway/events.gateway';

@Controller('main')
export class MainController {
  constructor(
    private readonly eventsGateway: EventsGateway,
    private readonly exerciseVolumeService: ExerciseVolumeService,
    private readonly foodService: FoodService,
  ) {}

  @Get()
  async getMaindata() {
    //const member = this.eventsGateway.getConnettions();
    const exerciseVolume = await this.exerciseVolumeService.getExerciseVolmes();
    const food = await this.foodService.getAllFoods(4);
    return { exerciseVolume, food };
  }
}
