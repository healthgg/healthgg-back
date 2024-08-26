import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ExerciseVolumeService } from './exercise_volume.service';
import { PostExerciseVolumeArrayDto } from './dto/crate_exercise_volme.dto';
import { Response } from 'express';

@Controller('exercise_volume')
export class ExerciseVolumeController {
  constructor(private readonly exerciseVolumeService: ExerciseVolumeService) {}

  @Get(':post_id')
  async getExerciseVolmesDetail(@Param('post_id') post_id: string) {
    return await this.exerciseVolumeService.getExerciseVolmesId(post_id);
  }

  @Post('share')
  async postExerciseVolmes(@Body() body: PostExerciseVolumeArrayDto) {
    return await this.exerciseVolumeService.postExerciseVolmes(body.data);
  }

  @Post('excel')
  async postExerciseVolmeExcel(
    @Body() body: PostExerciseVolumeArrayDto,
    @Res() res: Response,
  ) {
    // Excel 파일 생성
    const buffer = await this.exerciseVolumeService.postExerciseExcel(
      body.data,
    );

    res.header(
      'Content-Disposition',
      'attachment; filename=fitness-machines.xlsx',
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
    //res.download(buffer); // 파일 다운로드
  }
}
