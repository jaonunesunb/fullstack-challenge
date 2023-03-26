import { IContact } from "../Contact";

export interface IClient {
  id?: number;
  name: string;
  email: string;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
  contacts?: IContact[];
}

export interface IClientUpdate {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
}


export interface ClientWithContactsResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string | null;
  contacts: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }[];
}

export interface AllClientsResponse {
  clients: {
    id: number;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string | null;
  }[];
}
