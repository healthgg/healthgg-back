import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { foodModel } from './entity/food.entity';
import { Repository } from 'typeorm';
import { nutrientModel } from 'src/nutrient/entity/nutrient.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(foodModel)
    private readonly foodRepository: Repository<foodModel>,
    @InjectRepository(nutrientModel)
    private readonly nutrientRepository: Repository<nutrientModel>,
  ) {}

  async getFoodList() {
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
      .getMany();

    return { data: result };
  }
}
