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

  @Get()
  async getFoodList(@Query() cursorPageOptionDto: CursorPageOptionsDto) {
    //return await this.foodService.getFoodList();

    const result = await this.foodService.getFoodList(cursorPageOptionDto);

    console.log(result);
    return result;
  }

  @Get(':type')
  async getFoodListType(@Param('type', ParseIntPipe) type: number) {
    return await this.foodService.getFoodListType(type);
  }

  // @Post()
  // async postFoodList(@Body() body){

  //   return await this.foodService.

  // }
}
