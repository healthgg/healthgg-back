import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CursorPageOptionsDto } from './cursor-page/cursor-page-option.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get(':type')
  async getFoodList(
    @Param('type', ParseIntPipe) type: number,
    @Query() cursorPageOptionsDto: CursorPageOptionsDto,
  ) {
    const result = await this.foodService.getFoodList(
      cursorPageOptionsDto,
      type,
    );
    return result;
  }

  @Post('share')
  async postFoodList() {
    return 1;
  }

  @Post('excel')
  async postFoodListExecl(@Body() body) {
    //return await this.foodService.
  }

  @Get()
  async getSearchFoodList(@Body() body) {
    //return await this.foodService.
  }

  @Get(':post_id')
  async getFoodListDetail(@Body() body) {
    //return await this.foodService.
  }
}
