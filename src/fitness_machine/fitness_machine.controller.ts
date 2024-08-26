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

@Controller('fitness_machine')
export class FitnessMachineController {
  constructor(private readonly fitnessService: FitnessMachineService) {}

  @Get(':type')
  async getFitnessMachine(
    @Param('type', ParseIntPipe) type: number,
    @Query() cursorPageOptionsDto: CursorPageOptionsDto,
  ) {
    return await this.fitnessService.getFitnessMachineList(
      cursorPageOptionsDto,
      type,
    );
  }

  @Get()
  async getgetFitnessMachineSearch(@Query() search) {
    return await this.fitnessService.searchFitnessMachine(search);
  }
}
