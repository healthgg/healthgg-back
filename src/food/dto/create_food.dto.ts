import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { foodModel } from '../entity/food.entity';
import { Type } from 'class-transformer';

export class PostFoodDto extends foodModel {
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

export class PostFoodArrayDto {
  @ValidateNested({ each: true })
  @Type(() => PostFoodDto)
  data: PostFoodDto[];
}
