import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { foodModel } from './entity/food.entity';
import { nutrientModel } from 'src/nutrient/entity/nutrient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([foodModel, nutrientModel])],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}



