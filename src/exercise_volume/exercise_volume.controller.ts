import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ExerciseVolumeService } from './exercise_volume.service';
import { CreateExerciseVolumeADto } from './dto/create_exercise_volme.dto';
import { Response } from 'express';
import { ExerciseVolumeBoardModel } from './entity/exercise_volume_board.entity';
import { CursorPageOptionsDto } from 'src/food/cursor-page/cursor-page-option.dto';
import { CursorPageDto } from 'src/food/cursor-page/cursor-page.dto';

@Controller('exercise_volume')
export class ExerciseVolumeController {
  constructor(private readonly exerciseVolumeService: ExerciseVolumeService) {}

  @Get('best')
  public async getBestExerciseVolme(
    @Query() cursorPageOptionsDto: CursorPageOptionsDto,
  ): Promise<CursorPageDto<ExerciseVolumeBoardModel>> {
    return await this.exerciseVolumeService.getExerciseVolmesOrderbyViewConut(
      cursorPageOptionsDto,
    );
  }

  @Get('board/:post_id')
  public async getExerciseVolmesDetail(@Param('post_id') post_id: string) {
    return await this.exerciseVolumeService.getExerciseVolmesId(post_id);
  }

  @Post('share')
  public async postExerciseVolmes(
    @Body() body: { data: CreateExerciseVolumeADto },
  ) {
    return await this.exerciseVolumeService.postExerciseVolmes(body);
  }

  @Post('excel')
  public async postExerciseVolmeExcel(
    @Body() body: { data: CreateExerciseVolumeADto },
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
  }
}
