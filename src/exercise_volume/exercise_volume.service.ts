import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseVolumeModel } from './entity/exercise_volume.entity';
import { Repository } from 'typeorm';

import { generateRandomString } from 'src/utill/random';
import { BodyPartEnum } from 'src/body_part/enum/body_part.enum';
import { generateExcel } from 'src/utill/generateExecel';

@Injectable()
export class ExerciseVolumeService {
  constructor(
    @InjectRepository(ExerciseVolumeModel)
    private readonly exerciseVolumeRepository: Repository<ExerciseVolumeModel>,
  ) {}

  async getExerciseVolmes() {
    return await this.exerciseVolumeRepository.find({
      take: 4,
    });
  }

  async getExerciseVolmesId(post_id) {
    return await this.exerciseVolumeRepository.findBy({ post_id });
  }

  async postExerciseVolmes(body) {
    const post_id: string = generateRandomString(16);
    const data = body.map((e) => ({
      ...e,
      post_id,
    }));

    const exerciseEntity = this.exerciseVolumeRepository.create(data);
    await this.exerciseVolumeRepository.save(exerciseEntity);
  }

  async postExerciseExcel(body) {
    return await generateExcel(body);
  }
}
