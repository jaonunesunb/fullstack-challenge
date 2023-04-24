import { getRounds, hashSync } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { Contact } from "./Contact";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;
  
  @Column({ length: 70 })
  name!: string;

  @Column({ unique: true, length: 70, nullable: false })
  email!: string;

  @Column({ length: 120, nullable: false})
  password!: string;

  @Column({ length: 120, nullable: false})
  passwordConfirmation!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany((type) => Contact, (contact) => contact.user)
  contacts!: Contact[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @BeforeUpdate()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

}
