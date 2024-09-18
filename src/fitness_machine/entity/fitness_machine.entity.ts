import { BodyPartModel } from 'src/body_part/entity/body_part.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { IFitnessMachine } from '../interface/fitness_machine.interface';
import { ExerciseVolumeModel } from 'src/exercise_volume/entity/exercise_volume.entity';

@Entity('fitness_machine')
export class FitnessMachineModel implements IFitnessMachine {
  @PrimaryColumn({ comment: '헬스 기구 ID' })
  fitness_machine_id: number;

  @ManyToOne(() => BodyPartModel, (bodyPart) => bodyPart.fitnessMachines)
  @JoinColumn({ name: 'body_part_id' }) // 외래 키 컬럼 이름을 명시적으로 지정
  body_part: BodyPartModel;

  @OneToMany(
    () => ExerciseVolumeModel,
    (exerciseVolume) => exerciseVolume.fitness_machine,
  )
  exercise_volume: ExerciseVolumeModel[];

  @Column({ type: 'varchar', length: '255', comment: '헬스 기구 이미지 url' })
  finess_machine_imageurl: string;

  @Column({ type: 'varchar', length: '255', comment: '헬스 기구 이름' })
  finess_machine_name: string;

  @Column({ type: 'varchar', length: '255', comment: '헬스 기구 설명' })
  finess_machine_notice: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
