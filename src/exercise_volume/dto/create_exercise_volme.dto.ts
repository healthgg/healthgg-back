import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ExerciseVolumeModel } from '../entity/exercise_volume.entity';
import { emptyValidationMessage } from 'src/common/validation-message/empty-validation.message';

export class PostExerciseVolmeDto extends ExerciseVolumeModel {
  @IsInt()
  @IsNotEmpty()
  fitness_machine_id: number;

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

export class CreateExerciseVolumeADto {
  @IsString()
  @IsNotEmpty({ message: emptyValidationMessage })
  title: string;

  @IsString()
  @IsNotEmpty({ message: emptyValidationMessage })
  sub_title: string;

  @ValidateNested({ each: true })
  @Type(() => PostExerciseVolmeDto)
  description: PostExerciseVolmeDto[];
}

export class CreateExerciseVolumeDto {
  @IsArray()
  @IsNotEmpty({ message: emptyValidationMessage })
  data: CreateExerciseVolumeADto[];
}
