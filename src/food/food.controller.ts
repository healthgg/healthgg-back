import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CursorPageOptionsDto } from './cursor-page/cursor-page-option.dto';
import { CreateFoodDto } from './dto/create_food.dto';
import { SearchService } from 'src/search/search.service';
import { Response, Request } from 'express';
import { foodExcelDto } from './dto/create_food_excel.dto';
import { foodModel } from './entity/food.entity';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('best')
  public async getBestFoodList() {
    return await this.foodService.getFoodBoardOrderbyViewCount();
  }

  @Get(':type')
  public async getFoodList(
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
  public async postFoodList(
    @Body() body: { data: CreateFoodDto },
  ): Promise<void> {
    console.log(body.data);
    await this.foodService.postFoodListArray(body.data);
  }

  @Post('excel')
  public async postFoodListExecl(
    @Body() body: { data: foodExcelDto },
    @Res() res: Response,
  ) {
    const buffer = await this.foodService.postFoodListExcel(body.data);

    if (!buffer) {
      throw new InternalServerErrorException('엑셀파일을 생성하지 못했습니다.');
    }
    res.header('Content-Disposition', 'attachment; filename=food_list.xlsx');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Get()
  public async getSearchFoodList(@Query() search) {
    return await this.foodService.searchFood(search);
  }

  @Get('board/:post_id')
  public async getFoodListDetail(@Param('post_id') post_id: string) {
    return await this.foodService.getFoodDetail(post_id);
  }
}
