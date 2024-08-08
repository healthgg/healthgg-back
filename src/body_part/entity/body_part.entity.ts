import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BodyPartEnum } from '../enum/body_part.enum';
import { FitnessMachineModel } from 'src/fitness_machine/entity/fitness_machine.entity';
import { IBody_part } from '../interface/body_part.interface';

@Entity('body_part')
export class BodyPartModel implements IBody_part {
  @PrimaryColumn({ comment: '운동부위 ID' })
  body_part_id: number;

  @Column({
    type: 'enum',
    enum: Object.values(BodyPartEnum),
    default: BodyPartEnum.CHEST,
    comment: '운동 부위 1~5',
  })
  body_part_type: BodyPartEnum;

  @OneToMany(
    () => FitnessMachineModel,
    (fitnessMachine) => fitnessMachine.body_part,
  )
  fitnessMachines: FitnessMachineModel[];
}
