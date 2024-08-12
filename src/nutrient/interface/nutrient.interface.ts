import { foodModel } from 'src/food/entity/food.entity';

export interface INutrient {
  nutrient_id: number;
  food: foodModel;
  calory: string;
  protein: string;
  carbohydrate: string;
  fat: string;
  amount: string;
  unit: string;
}
