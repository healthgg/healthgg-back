import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BodyPartEnum } from '../enum/body_part.enum';
import { FitnessMachineModel } from 'src/fitness_machine/entity/fitness_machine.entity';

@Entity('body_part')
export class BodyPartModel {
  @PrimaryColumn()
  @OneToMany(
    () => FitnessMachineModel,
    (fitenessmachine) => fitenessmachine.body_part_id,
  )
  body_part_id: number;

  @Column({
    type: 'enum',
    enum: Object.values(BodyPartEnum),
    default: BodyPartEnum.CHEST,
  })
  body_part_type: BodyPartEnum;
}
