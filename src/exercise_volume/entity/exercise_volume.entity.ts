import { FitnessMachineModel } from 'src/fitness_machine/entity/fitness_machine.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('exercise_volume')
export class ExerciseVolumeModel {
  @PrimaryColumn()
  volume_id: number;

  @Column()
  @ManyToOne(
    () => FitnessMachineModel,
    (fitenessmachine) => fitenessmachine.fitness_machine_id,
  )
  @JoinColumn()
  fitness_machine_id: number;

  @Column()
  repetition: number;

  @Column()
  set: number;

  @Column()
  weight: number;

  @Column()
  total_weight: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
