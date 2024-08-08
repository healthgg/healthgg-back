import { FitnessMachineModel } from 'src/fitness_machine/entity/fitness_machine.entity';

export interface IExercise_volume {
  volume_id: number;
  fitness_machine: FitnessMachineModel;
  repetition: number;
  set: number;
  weight: number;
  total_weight: number;
  created_at: Date;
}
