import { Controller } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { ExerciseVolumeService } from 'src/exercise_volume/exercise_volume.service';
import { EventsGateway } from 'src/gateway/events.gateway';

@Controller('main')
export class MainController {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly eventsGateway: EventsGateway,
    private readonly exerciseVolumeService: ExerciseVolumeService,
  ) {}

  async getMaindata() {
    console.log(this.server);
    const members = this.eventsGateway.getConnettions();
    const exerciseVolume = await this.exerciseVolumeService.getExerciseVolmes();
    return { member: members, exerciseVolume };
  }
}
