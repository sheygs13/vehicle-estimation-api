import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  AfterInsert,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  // hooks run when create the entity instance before saving
  // as opposed to saving plain objects
  @AfterInsert()
  logAfter() {
    console.log(`Inserted userId: ${this.id}`);
  }
}
