import { IUser, IUserRequest, IUserResponse } from "../../interfaces/user";
import AppDataSource from "../../data-source";
import { userWithoutPasswordSchema } from "../../schemas/userSchemas/userSchemas";
import { User } from "../../entities/User";
import AppError from "../../errors/AppError";
import { hashSync } from "bcryptjs";

const createUserService = async (userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const exists = await userRepository.exist({
    where: { email: userData.email },
    withDeleted: true,
  });

  if (exists) {
    throw new AppError("Email already in use", 409);
  }

  if (userData.password != userData.passwordConfirmation) {
    throw new AppError("Passwords didn't match", 400);
  }
  const userCreated = userRepository.create(userData);

  userCreated.password = hashSync(userData.password, 10);

  const user = await userRepository.save({ ...userCreated });

  const userWithoutPassord = await userWithoutPasswordSchema.validate(user, {
    stripUnknown: true,
  });

  return userWithoutPassord;
};

export default createUserService;
