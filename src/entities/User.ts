import { getRounds, hashSync } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;
  
  @Column({ length: 70 })
  name!: string;

  @Column({ unique: true, length: 70, nullable: false })
  email!: string;

  @Column({ length: 120 })
  password!: string;

  @Column({ default: true })
  isActive!: boolean;

  @BeforeInsert()
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @BeforeUpdate()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

}

