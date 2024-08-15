import { Controller, Get } from '@nestjs/common';
import { ExerciseVolumeService } from 'src/exercise_volume/exercise_volume.service';
import { EventsGateway } from 'src/gateway/events.gateway';

@Controller('main')
export class MainController {
  constructor(
    private readonly eventsGateway: EventsGateway,
    private readonly exerciseVolumeService: ExerciseVolumeService,
  ) {}

  @Get()
  async getMaindata() {
    const members = this.eventsGateway.getConnettions();
    const exerciseVolume = await this.exerciseVolumeService.getExerciseVolmes();
    return { member: members, exerciseVolume };
  }
}
