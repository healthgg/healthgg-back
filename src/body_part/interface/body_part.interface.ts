import { FitnessMachineModel } from 'src/fitness_machine/entity/fitness_machine.entity';
import { BodyPartEnum } from '../enum/body_part.enum';

export interface IBody_part {
  body_part_id: number;
  body_part_type: BodyPartEnum;
  fitnessMachines: FitnessMachineModel[];
}
