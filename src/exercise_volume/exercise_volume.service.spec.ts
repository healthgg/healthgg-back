import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseVolumeService } from './exercise_volume.service';

describe('ExerciseVolumeService', () => {
  let service: ExerciseVolumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseVolumeService],
    }).compile();

    service = module.get<ExerciseVolumeService>(ExerciseVolumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
