import { FitnessMachineModel } from 'src/fitness_machine/entity/fitness_machine.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IExercise_volume } from '../interface/exercise_volume.interface';

@Entity('exercise_volume')
export class ExerciseVolumeModel implements IExercise_volume {
  @PrimaryGeneratedColumn({ comment: '운동 볼륨 ID' })
  volume_id: number;

  @Column({ comment: '헬스 기구 ID' })
  fitness_machine_id: number;

  @ManyToOne(
    () => FitnessMachineModel,
    (fitnessMachine) => fitnessMachine.exercise_volume,
  )
  @JoinColumn({ name: 'fitness_machine_id' }) // 외래 키 이름을 명시적으로 지정
  fitness_machine: FitnessMachineModel;

  @Column({ type: 'int', unsigned: true, comment: '반복 횟수' })
  repetition: number;

  @Column({ type: 'int', unsigned: true, comment: '세트 수' })
  set: number;

  @Column('decimal', { precision: 10, scale: 1, comment: '수행 중량' })
  weight: number;

  @Column('decimal', { precision: 10, scale: 1, comment: '횟수 x 세트 x 중량' })
  total_weight: number;

  @Column({ type: 'varchar', length: '50', comment: '운동 볼륨 게시글 고유값' })
  post_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
