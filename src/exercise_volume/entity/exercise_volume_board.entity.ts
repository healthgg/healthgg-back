import { BoardBaseModel } from 'src/common/entity/board_base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exercise_volume_board')
export class ExerciseVolumeBoardModel extends BoardBaseModel {
  @PrimaryGeneratedColumn({ comment: '운동 볼륨 게시글 ID' })
  exercise_volume_board_id: number;

  fitness_machine_urls?: string[];
}
