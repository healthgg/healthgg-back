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

  async postExerciseVolmes(body) {
    const data = [
      {
        fitness_machine_id: 123,
        repetition: 20,
        set: 4,
        weight: 200,
        total_weight: 3000,
        post_id: '73ce6b19ffbb74e6bfbbb77c3a589688',
      },
      {
        fitness_machine_id: 1,
        repetition: 20,
        set: 4,
        weight: 200,
        total_weight: 3000,
        post_id: '73ce6b19ffbb74e6bfbbb77c3a589688',
      },
      {
        fitness_machine_id: 3,
        repetition: 20,
        set: 4,
        weight: 200,
        total_weight: 3000,
        post_id: '73ce6b19ffbb74e6bfbbb77c3a589688',
      },
      {
        fitness_machine_id: 2,
        reptition: 20,
        set: 4,
        weight: 200,
        total_weight: 3000,
        post_id: '73ce6b19ffbb74e6bfbbb77c3a589688',
      },
    ];
    // const post_id: string = generateRandomString(16);

    // const data = body.map((e) => ({
    //   ...e,
    //   post_id,
    // }));

    // console.log(data);

    const newEntity = this.exerciseVolumeRepository.create(data);

    console.log(newEntity);
    const b = await this.exerciseVolumeRepository.save(newEntity);
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
