import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: string;

  @Column()
  mileage: string;

  @Column()
  price: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
