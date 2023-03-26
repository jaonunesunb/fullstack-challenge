export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IUserRequest {
    name: string;
    email: string;
    password: string;
  }
  
  export interface IUserResponse {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IUserLogin {
    email: string;
    password: string;
  }
  
  export interface IUserUpdate {
    name?: string;
    email?: string;
    password?: string;
  }