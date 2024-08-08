import { foodModel } from 'src/food/entity/food.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('nutrient')
export class nutrientModel {
  @PrimaryColumn()
  nutrient_id: number;

  @OneToOne(() => foodModel, (food: foodModel) => food.food_id)
  @JoinColumn()
  food_id: foodModel;

  @Column()
  calory: string;

  @Column()
  protein: string;

  @Column()
  carbohydrate: string;

  @Column()
  fat: string;

  @Column()
  amount: string;

  @Column()
  unit: string;
}
