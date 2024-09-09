import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseVolumeModel } from './entity/exercise_volume.entity';
import { Repository } from 'typeorm';

import { generateRandomString } from 'src/utill/random';
import { BodyPartEnum } from 'src/body_part/enum/body_part.enum';
import { generateVolumeExcel } from 'src/utill/generateExecel';
import { ExerciseVolumeBoardModel } from './entity/exercise_volume_board.entity';
import { FitnessMachineModel } from 'src/fitness_machine/entity/fitness_machine.entity';

@Injectable()
export class ExerciseVolumeService {
  constructor(
    @InjectRepository(ExerciseVolumeModel)
    private readonly exerciseVolumeRepository: Repository<ExerciseVolumeModel>,
    @InjectRepository(ExerciseVolumeBoardModel)
    private readonly exerciseVolumeBoardRepository: Repository<ExerciseVolumeBoardModel>,
    @InjectRepository(FitnessMachineModel)
    private readonly fitnessMachineRepository: Repository<FitnessMachineModel>,
  ) {}

  public async getExerciseVolmes(): Promise<ExerciseVolumeBoardModel[]> {
    const exerciseVolumeList = await this.exerciseVolumeBoardRepository.find({
      order: {
        viewCount: 'DESC',
      },
      take: 4,
    });

    if (exerciseVolumeList.length === 0 || !exerciseVolumeList) {
      {
        throw new BadRequestException('운동 볼륨 게시글이 없습니다.');
      }
    }

    exerciseVolumeList.map(async (data) => {
      data.description = JSON.parse(data.description);
      const descriptionArr = data.description;
      const fitnessMachineUrlList = [];
      for (let i = 0; i < descriptionArr.length; i++) {
        const fitnessMachineArr = await this.fitnessMachineRepository.findBy({
          fitness_machine_id: descriptionArr[i]['fitness_machine_id'],
        });

        for (const fitnessMachine of fitnessMachineArr) {
          fitnessMachineUrlList.push(fitnessMachine.finess_machine_imageurl);
        }
        console.log(fitnessMachineUrlList);
      }
      data.fitness_machine_urls = fitnessMachineUrlList;
    });

    return exerciseVolumeList;
  }

  public async getExerciseVolmesId(
    post_id: string,
  ): Promise<ExerciseVolumeBoardModel[]> {
    const exerciseVolumeList = await this.exerciseVolumeBoardRepository.findBy({
      board_id: post_id,
    });

    if (exerciseVolumeList.length === 0 || !exerciseVolumeList) {
      throw new NotFoundException('운동 볼륨 게시글이 없습니다.');
    }

    exerciseVolumeList.map((data) => {
      data.description = JSON.parse(data.description);
    });
    return exerciseVolumeList;
  }

  public async postExerciseVolmes(body): Promise<void> {
    const post_id: string = generateRandomString(16);
    const { data } = body;
    data.description = JSON.stringify(data.description);
    data.board_id = post_id;
    const exerciseEntity = this.exerciseVolumeBoardRepository.create(data);
    await this.exerciseVolumeBoardRepository.save(exerciseEntity);
  }

  async postExerciseExcel(body) {
    return await generateVolumeExcel(body);
  }
}
