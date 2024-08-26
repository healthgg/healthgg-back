import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { ExerciseVolumeModel } from '../entity/exercise_volume.entity';

export class PostExerciseVolmeDto extends ExerciseVolumeModel {
  //@IsInt()
  //@IsNotEmpty()
  fitness_machine_id: number;

  finess_machine_name: string;

  @IsInt()
  @IsNotEmpty()
  repetition: number;

  @IsInt()
  @IsNotEmpty()
  set: number;

  @IsInt()
  @IsNotEmpty()
  weight: number;

  @IsInt()
  @IsNotEmpty()
  total_weight: number;
}

export class PostExerciseVolumeArrayDto {
  @ValidateNested({ each: true })
  @Type(() => PostExerciseVolmeDto)
  data: PostExerciseVolmeDto[];
}
