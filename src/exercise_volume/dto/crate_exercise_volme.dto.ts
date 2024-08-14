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
  @IsOptional()
  volume_id: number;

  @IsInt()
  //@Min(5)
  @IsNotEmpty()
  fitness_machine_id: number;

  // @IsInt()
  // @Min(1)
  // @IsNotEmpty()
  repetition: number;

  // @IsInt()
  // @Min(1)
  // @IsNotEmpty()
  set: number;

  // @IsInt()
  // @Min(1)
  // @IsNotEmpty()
  weight: number;

  // @IsInt()
  // @Min(0)
  // @IsNotEmpty()
  total_weight: number;

  @IsOptional()
  post_id: string;

  @IsOptional()
  created_at: Date;
}

export class PostExerciseVolumeArrayDto {
  @ValidateNested({ each: true })
  @Type(() => PostExerciseVolmeDto)
  data: PostExerciseVolmeDto[];
}
