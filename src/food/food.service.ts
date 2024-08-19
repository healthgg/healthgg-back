import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { foodModel } from './entity/food.entity';
import { LessThan, Repository } from 'typeorm';
import { nutrientModel } from 'src/nutrient/entity/nutrient.entity';
import { NutrientEnum } from 'src/nutrient/enum/nutrient.enum';
import { CursorPageOptionsDto } from './cursor-page/cursor-page-option.dto';
import { CursorPageMetaDto } from './cursor-page/cursor-page.meta.dto';
import { CursorPageDto } from './cursor-page/cursor-page.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { generateRandomString } from 'src/utill/random';
import { generateExcel } from 'src/utill/generateExecel';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class FoodService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(foodModel)
    private readonly foodRepository: Repository<foodModel>,
    @InjectRepository(nutrientModel)
    private readonly nutrientRepository: Repository<nutrientModel>,
    private readonly searchService: SearchService,
  ) {}

  async getFoodList(cursorPageOptionsDto: CursorPageOptionsDto, type: number) {
    let take = cursorPageOptionsDto?.take || 4;

    if (!Object.values(NutrientEnum).includes(type)) {
      throw new BadRequestException('존재 하지 않는 영양소');
    }
    const [foods, total] = await this.foodRepository
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
      .where(
        'nutrient.mainNutrient = :mainNutrient AND food.food_id < :cursorId',
        { mainNutrient: type, cursorId: cursorPageOptionsDto.cursorId },
      )
      .orderBy('food.food_id', 'DESC')
      .take(take)
      .getManyAndCount();

    let hasNextData = true;
    let cursor: number;
    let firstDataWithNextCursor;

    const takePerScroll = cursorPageOptionsDto.take;
    const isLastScroll = total <= takePerScroll;
    const lastDataPerScroll = foods[foods.length - 1];

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

    const cursorPageMetaDto = new CursorPageMetaDto({
      cursorPageOptionsDto,
      total,
      hasNextData,
      cursor,
    });

    return new CursorPageDto(foods, cursorPageMetaDto);
  }

  async getAllFoods(take?: number | null) {
    const cacheFoods = await this.cacheManager.get('foods');
    if (!cacheFoods) {
      console.log('Cache Miss');
      await this.cacheManager.set(
        'foods',
        JSON.stringify(await this.foodRepository.find()),
        604800,
      );
      return take
        ? await this.foodRepository.find({
            take,
          })
        : await this.foodRepository.find();
    }

    return take
      ? await this.foodRepository.find({ take })
      : JSON.parse(await this.cacheManager.get('foods'));
  }

  async getFoodDetail(post_id: string) {
    return await this.foodRepository.find({
      where: {
        post_id,
      },
    });
  }

  async postFoodListArray(body) {
    const post_id: string = generateRandomString(16);
    const data = body.map((e) => ({
      ...e,
      post_id,
    }));

    const foodEntity = this.foodRepository.create(data);

    await this.foodRepository.save(foodEntity);
  }

  async postFoodListExcel(body) {
    return await generateExcel(body);
  }

  async searchFood(search) {
    return await this.searchService.searchFood(search);
  }
}
