import {
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { emptyValidationMessage } from 'src/common/validation-message/empty-validation.message';

export class FoodItemDto {
  @IsInt()
  @IsNotEmpty()
  food_id: number;

  @IsInt()
  @IsNotEmpty()
  nutrient_id: number;

  @IsString()
  @IsNotEmpty()
  food_imageurl: string;

  @IsString()
  @IsNotEmpty()
  food_name: string;

  @IsString()
  @IsNotEmpty()
  food_notice: string;
}

export class MealDto {
  @ValidateNested({ each: true })
  @Type(() => FoodItemDto)
  @IsArray()
  Breakfast: FoodItemDto[];

  @ValidateNested({ each: true })
  @Type(() => FoodItemDto)
  @IsArray()
  Lunch: FoodItemDto[];

  @ValidateNested({ each: true })
  @Type(() => FoodItemDto)
  @IsArray()
  Dinner: FoodItemDto[];
}

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty({
    message: emptyValidationMessage,
  })
  @Length(1, 20, {
    message: lengthValidationMessage,
  })
  title: string;

  @IsString()
  @IsNotEmpty({
    message: emptyValidationMessage,
  })
  @Length(1, 50, {
    message: lengthValidationMessage,
  })
  sub_title: string;

  @ValidateNested()
  @Type(() => MealDto)
  description: MealDto;
}
