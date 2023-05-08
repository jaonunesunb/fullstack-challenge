import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/user";
import { createSessionService } from "../../services/login/createSession.service";

export const createSessionController = async (req: Request, res: Response) => {
  const sessionData: IUserLogin = req.body;
  const { token, user } = await createSessionService(sessionData);
  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
};
