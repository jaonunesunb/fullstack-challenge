import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Contact } from "./Contact";

@Entity({ name: "client" })
export class Client {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @BeforeInsert()
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @BeforeUpdate()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToMany(() => Contact, { cascade: true })
  @JoinTable({
    name: "client_contact",
    joinColumn: { name: "client_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "contact_id", referencedColumnName: "id" },
  })
  contacts!: Contact[];
}