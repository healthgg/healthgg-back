import { BodyPartModel } from 'src/body_part/entity/body_part.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IfitnessMachine } from '../interface/fitness_machine.interface';

@Entity('fitness_machine')
export class FitnessMachineModel implements IfitnessMachine {
  @PrimaryColumn()
  fitness_machine_id: number;

  @ManyToOne(() => BodyPartModel, (bodypart) => bodypart.body_part_id)
  @JoinColumn()
  body_part_id: number;

  @Column()
  finess_machine_imageurl: string;

  @Column()
  finess_machine_name: string;

  @Column()
  finess_machine_notice: string;
}
