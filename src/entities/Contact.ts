import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "contacts" })
export class Contact {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;
 
  @ManyToOne((type) => User, (user) => user.contacts)
  user!: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @BeforeUpdate()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

}