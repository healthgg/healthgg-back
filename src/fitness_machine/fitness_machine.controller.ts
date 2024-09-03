import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Search,
} from '@nestjs/common';
import { FitnessMachineService } from './fitness_machine.service';
import { IFitnessMachine } from './interface/fitness_machine.interface';
import { CursorPageOptionsDto } from 'src/food/cursor-page/cursor-page-option.dto';
import { FitnessMachineModel } from './entity/fitness_machine.entity';
import { CursorPageDto } from 'src/food/cursor-page/cursor-page.dto';

@Controller('fitness_machine')
export class FitnessMachineController {
  constructor(private readonly fitnessService: FitnessMachineService) {}

  @Get(':type')
  public async getFitnessMachine(
    @Param('type', ParseIntPipe) type: number,
    @Query() cursorPageOptionsDto: CursorPageOptionsDto,
  ): Promise<CursorPageDto<FitnessMachineModel>> {
    const result = await this.fitnessService.getFitnessMachineList(
      cursorPageOptionsDto,
      type,
    );

    return result;
  }

  @Get()
  public async getgetFitnessMachineSearch(@Query() search) {
    return await this.fitnessService.searchFitnessMachine(search);
  }
}
