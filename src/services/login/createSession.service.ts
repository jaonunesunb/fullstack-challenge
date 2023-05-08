import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import "dotenv/config";
import AppError from "../../errors/AppError";
import { User } from "../../entities/User";
import { IUserLogin } from "../../interfaces/user";

export const createSessionService = async (
  data: IUserLogin
): Promise<{ token: string; user: User }> => {
  if (!data.email || !data.password) {
    throw new AppError("Email and password are required", 400);
  }

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: data.email,
  });

  if (user) {
    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError("User or password invalid", 403);
    }

    
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      String(process.env.SECRET_KEY),
      {
        expiresIn: "1d",
      }
    );
    return { token, user };
  }

  throw new AppError("User or password invalid", 403);
};
