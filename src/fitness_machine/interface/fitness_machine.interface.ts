import { BodyPartModel } from 'src/body_part/entity/body_part.entity';

export interface IFitnessMachine {
  fitness_machine_id: number;

  body_part: BodyPartModel;

  fitness_machine_imageurl: string;

  fitness_machine_name: string;

  fitness_machine_notice: string;
}
