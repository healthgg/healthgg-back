import { Body, Controller, Post, Res } from '@nestjs/common';
import { ExerciseVolumeService } from './exercise_volume.service';
import {
  PostExerciseVolmeDto,
  PostExerciseVolumeArrayDto,
} from './dto/crate_exercise_volme.dto';

@Controller('exercise-volume')
export class ExerciseVolumeController {
  constructor(private readonly exerciseVolumeService: ExerciseVolumeService) {}

  @Post('share')
  async postExerciseVolmes(@Body() body: PostExerciseVolumeArrayDto) {
    const a = await this.exerciseVolumeService.postExerciseVolmes(body.data);

    return;
  }

  @Post('execel')
  async postExerciseVolmeExcel(@Res() res: Response) {
    // 데이터 예시
    const data = [
      {
        fitness_machine_id: 1,
        repetition: 20,
        set: 4,
        weight: 200,
        total_weight: 3000,
      },
      {
        fitness_machine_id: 2,
        repetition: 15,
        set: 3,
        weight: 150,
        total_weight: 2250,
      },
      // 추가 데이터
    ];

    // Excel 파일 생성
    const buffer = await this.exerciseVolumeService.generateExcel(data);

    // 파일 전송
    // res.setHeader(
    //   'Content-Disposition',
    //   'attachment; filename=fitness-machines.xlsx',
    // );
    // res.setHeader(
    //   'Content-Type',
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // );
    // res.end(buffer);
  }
}
