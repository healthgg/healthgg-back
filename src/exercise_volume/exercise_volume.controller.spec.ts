import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseVolumeController } from './exercise_volume.controller';

describe('ExerciseVolumeController', () => {
  let controller: ExerciseVolumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseVolumeController],
    }).compile();

    controller = module.get<ExerciseVolumeController>(ExerciseVolumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
