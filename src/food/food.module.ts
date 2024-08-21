import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { foodModel } from './entity/food.entity';
import { nutrientModel } from 'src/nutrient/entity/nutrient.entity';
import { SearchModule } from 'src/search/search.module';
import { FoodBoardModel } from './entity/foodBoard.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([foodModel, nutrientModel, FoodBoardModel]),
    SearchModule,
  ],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [TypeOrmModule],
})
export class FoodModule {}
