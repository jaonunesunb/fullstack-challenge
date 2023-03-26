import { Request, Response } from "express";
import { IUser } from "../../interfaces/user";
import { createSessionService } from "../../services/login/createSession.service";

export const createSessionController = async (req: Request, res: Response) => {
  const sessionData: IUser = req.body;
  const token = await createSessionService(sessionData);
  return res.json({ token });
};
