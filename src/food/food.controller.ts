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
import { PostFoodArrayDto, PostFoodDto } from './dto/create_food.dto';
import { SearchService } from 'src/search/search.service';

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
  async postFoodList(@Body() body: PostFoodArrayDto) {
    return await this.foodService.postFoodListArray(body.data);
  }

  @Post('excel')
  async postFoodListExecl(@Body() body) {
    return await this.foodService.postFoodListExcel(body.data);
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
