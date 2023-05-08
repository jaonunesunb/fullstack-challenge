import { IUser } from "../user";

export interface IContactRequest {
  name: string;
  email: string;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IContactResponse {
  id?: number;
  name: string;
  email: string;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
  user?: IUser;
}

export interface IContactUpdate {
  name?: string;
  email?: string;
  phone?: string;
}
