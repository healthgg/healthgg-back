import { BodyPartModel } from 'src/body_part/entity/body_part.entity';

export interface IFitnessMachine {
  fitness_machine_id: number;

  body_part: BodyPartModel;

  finess_machine_imageurl: string;

  finess_machine_name: string;

  finess_machine_notice: string;
}
