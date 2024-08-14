import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { foodModel } from './entity/food.entity';
import { LessThan, Repository } from 'typeorm';
import { nutrientModel } from 'src/nutrient/entity/nutrient.entity';
import { NutrientEnum } from 'src/nutrient/enum/nutrient.enum';
import { CursorPageOptionsDto } from './cursor-page/cursor-page-option.dto';
import { CursorPageMetaDto } from './cursor-page/cursor-page.meta.dto';
import { CursorPageDto } from './cursor-page/cursor-page.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(foodModel)
    private readonly foodRepository: Repository<foodModel>,
    @InjectRepository(nutrientModel)
    private readonly nutrientRepository: Repository<nutrientModel>,
  ) {}

  async getFoodList(cursorPageOptionDto: CursorPageOptionsDto) {
    const [foods, total] = await this.foodRepository.findAndCount({
      take: cursorPageOptionDto.take,
      where: {
        food_id: LessThan(cursorPageOptionDto.cursorId),
      },
      order: {
        food_id: 'DESC' as any,
      },
    });

    console.log(cursorPageOptionDto.sort);
    //console.log('mates: ', b);
    //const a = await this.foodRepository.count()
    // let cursorId = 0;
    // const result = await this.foodRepository
    //   .createQueryBuilder('food')
    //   .leftJoinAndSelect('food.nutrient', 'nutrient')
    //   .select([
    //     'food.food_id',
    //     'food.food_imageurl',
    //     'food.food_name',
    //     'food.food_notice',
    //     'nutrient.nutrient_id',
    //     'nutrient.calory',
    //     'nutrient.protein',
    //     'nutrient.carbohydrate',
    //     'nutrient.fat',
    //     'nutrient.amount',
    //     'nutrient.unit',
    //     'nutrient.mainNutrient',
    //   ])
    //   .getMany();
    // return { data: result };
    let hasNextData = true;
    let cursor: number;
    let firstDataWithNextCursor;

    const takePerScroll = cursorPageOptionDto.take;
    const isLastScroll = total <= takePerScroll;
    const lastDataPerScroll = foods[foods.length - 1];

    //---------------------------------------------------------

    const allFoods = await this.getAllFoods();

    if (isLastScroll) {
      hasNextData = false;
      cursor = null;
    } else {
      cursor = lastDataPerScroll.food_id;
      const lastDataPerPageIndexOf = allFoods.findIndex(
        (data) => data.food_id === cursor,
      );
      firstDataWithNextCursor = allFoods[lastDataPerPageIndexOf - 1];

      foods.push(firstDataWithNextCursor);
    }

    //------------------------------------------------------------

    const cursorPageMetaDto = new CursorPageMetaDto({
      cursorPageOptionDto,
      total,
      hasNextData,
      cursor,
    });

    return new CursorPageDto(foods, cursorPageMetaDto);
  }

  async getFoodListType(type: number) {
    if (!Object.values(NutrientEnum).includes(type)) {
      throw new BadRequestException('존재 하지 않는 영양소');
    }
    const result = await this.foodRepository
      .createQueryBuilder('food')
      .leftJoinAndSelect('food.nutrient', 'nutrient')
      .select([
        'food.food_id',
        'food.food_imageurl',
        'food.food_name',
        'food.food_notice',
        'nutrient.nutrient_id',
        'nutrient.calory',
        'nutrient.protein',
        'nutrient.carbohydrate',
        'nutrient.fat',
        'nutrient.amount',
        'nutrient.unit',
        'nutrient.mainNutrient',
      ])
      .where('nutrient.mainNutrient = :mainNutrient', { mainNutrient: type })
      .getMany();

    return { data: result };
  }

  async getAllFoods() {
    return await this.foodRepository.find();
  }
}
