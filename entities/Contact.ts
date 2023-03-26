import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Client } from "./Client";

@Entity({ name: "contact" })
export class Contact {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @OneToMany(() => Client, (client) => client.contacts)
  clients!: Client[];

  @BeforeInsert()
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @BeforeUpdate()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
