import express from 'express'

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email?: string;
        isActve?: boolean;
      };
      client: {
        id: number
      }
    }
  }
}

export {};