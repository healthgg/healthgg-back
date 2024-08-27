import { foodModel } from 'src/food/entity/food.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { INutrient } from '../interface/nutrient.interface';
import { NutrientEnum } from '../enum/nutrient.enum';
import { FoodBoardModel } from 'src/food/entity/foodBoard.entity';

@Entity('nutrient')
export class nutrientModel implements INutrient {
  @PrimaryColumn({ comment: '영양소 ID' })
  nutrient_id: number;

  @OneToMany(() => FoodBoardModel, (foodBoard) => foodBoard.nutrient)
  foodBoards: FoodBoardModel[];

  @OneToOne(() => foodModel, (food) => food.nutrient)
  @JoinColumn({ name: 'food_id' }) // 외래 키로 설정
  food: foodModel;

  @Column({ type: 'varchar', length: '255', comment: '음식 칼로리' })
  calory: string;

  @Column({ type: 'varchar', length: '255', comment: '음식 단밸직' })
  protein: string;

  @Column({ type: 'varchar', length: '255', comment: '음식 탄수화물' })
  carbohydrate: string;

  @Column({ type: 'varchar', length: '255', comment: '음식 지방' })
  fat: string;

  @Column({ type: 'varchar', length: '255', comment: '총량' })
  amount: string;

  @Column({ type: 'varchar', length: '255', comment: '단위' })
  unit: string;

  @Column({
    type: 'enum',
    enum: Object.values(NutrientEnum),
    default: NutrientEnum.PROTEIN,
    comment: '주영양소',
  })
  mainNutrient: NutrientEnum;
}
