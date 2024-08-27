import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('visitor')
export class visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  totalvistor: number;
}
