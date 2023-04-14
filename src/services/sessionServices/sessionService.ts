import { IUserLogin } from "../../interfaces/user";
import jwt, { Secret } from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/User";
import AppError from "../../errors/AppError";
import "dotenv/config";

const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or password invalid", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("User or password invalid", 403);
  }

  const token = jwt.sign(
    {
      isActive: user.isActive,
    },
    process.env.SECRET_KEY as Secret,
    {
      subject: String(user.id),
      expiresIn: "1d",
    }
  );

  return token;
};

export default createSessionService;
