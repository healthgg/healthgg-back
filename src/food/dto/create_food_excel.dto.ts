import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FoodItemExcelDto {
  @IsInt()
  @IsNotEmpty()
  food_name: number;

  @IsInt()
  @IsNotEmpty()
  calory: number;

  @IsString()
  @IsNotEmpty()
  protein: number;

  @IsString()
  @IsNotEmpty()
  carbohydrate: number;

  @IsString()
  @IsNotEmpty()
  fat: number;
}

export class foodExcelDto {
  @ValidateNested({ each: true })
  @Type(() => FoodItemExcelDto)
  @IsArray()
  Breakfast: FoodItemExcelDto[];

  @ValidateNested({ each: true })
  @Type(() => FoodItemExcelDto)
  @IsArray()
  Lunch: FoodItemExcelDto[];

  @ValidateNested({ each: true })
  @Type(() => FoodItemExcelDto)
  @IsArray()
  Dinner: FoodItemExcelDto[];
}
