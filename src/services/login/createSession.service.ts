import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import "dotenv/config";
import AppError from "../../errors/AppError";
import { User } from "../../entities/User";
import { IUser } from "../../interfaces/user";

export const createSessionService = async ({
  email,
  password,
}: IUser): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (user) {
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("User or password invalid", 403);
    }

    const token = jwt.sign(
      {
        email: email,
        id: user.id,
      },
      process.env.SECRET_KEY!,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return token;
  }

  throw new AppError("User or password invalid", 403);
};
