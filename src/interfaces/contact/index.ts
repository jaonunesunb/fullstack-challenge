import { IClient } from "../client";

export interface IContact {
  id?: number;
  name: string;
  email: string;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
  client?: IClient;
  clientId?: number;
}

export interface IContactUpdate {
  name?: string;
  email?: string;
  phone?: string;
}
