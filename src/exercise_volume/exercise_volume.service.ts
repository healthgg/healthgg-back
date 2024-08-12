import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseVolumeModel } from './entity/exercise_volume.entity';
import { Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';
import { generateRandomString } from 'src/utill/random';

@Injectable()
export class ExerciseVolumeService {
  constructor(
    @InjectRepository(ExerciseVolumeModel)
    private readonly exerciseVolumeRepository: Repository<ExerciseVolumeModel>,
  ) {}

  async getExerciseVolmes() {
    return await this.exerciseVolumeRepository.find();
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

    const newEntity = this.exerciseVolumeRepository.create(data);
    await this.exerciseVolumeRepository.save(newEntity);
  }

  async generateExcel(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.columns = [
      { header: 'Fitness Machine ID', key: 'fitness_machine_id', width: 20 },
      { header: 'Repetition', key: 'repetition', width: 15 },
      { header: 'Set', key: 'set', width: 10 },
      { header: 'Weight', key: 'weight', width: 15 },
      { header: 'Total Weight', key: 'total_weight', width: 20 },
    ];

    data.forEach((item) => {
      worksheet.addRow({
        fitness_machine_id: item.fitness_machine_id,
        repetition: item.repetition,
        set: item.set,
        weight: item.weight,
        total_weight: item.total_weight,
      });
    });

    // 파일을 버퍼로 저장
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
