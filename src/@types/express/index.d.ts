import { UUID } from "crypto";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email?: string;
        isActve?: boolean;
        name: string;
      };
    }
  }
}

export {};
