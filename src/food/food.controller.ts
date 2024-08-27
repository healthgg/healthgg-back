import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CursorPageOptionsDto } from './cursor-page/cursor-page-option.dto';
import { PostFoodArrayDto, PostFoodDto } from './dto/create_food.dto';
import { SearchService } from 'src/search/search.service';
import { Response } from 'express';

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
    return { foodList: result.data, meta: result.meta };
  }

  @Post('share')
  async postFoodList(@Body() body) {
    return await this.foodService.postFoodListArray(body.data);
  }

  @Post('excel')
  async postFoodListExecl(@Body() body, @Res() res: Response) {
    const buffer = await this.foodService.postFoodListExcel(body.data);

    res.header('Content-Disposition', 'attachment; filename=food_list.xlsx');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Get()
  async getSearchFoodList(@Query() search) {
    return await this.foodService.searchFood(search);
  }

  @Get('board/:post_id')
  async getFoodListDetail(@Param('post_id') post_id: string) {
    return await this.foodService.getFoodDetail(post_id);
  }
}
