import AppDataSource from "../../data-source";
import { User } from "../../entities/user";
import { hashSync } from "bcryptjs";
import { IUserUpdate } from "../../interfaces/user";
import { userUpdatedSchema } from "../../schemas/userSchemas/userSchemas";
import AppError from "../../errors/AppError";

const updateUserService = async (
  body: IUserUpdate,
  userID: string,
  loggedUserId: string
) => {
  const userRepository = AppDataSource.getRepository(User);

  if (Object.keys(body).includes("email")) {
    const user = await userRepository.findOneBy({ email: body.email });

    if (user !== null) {
      if (user.id !== userID) {
        throw new AppError("email already on use", 409);
      }
    }
  }

  if (Object.keys(body).includes("password")) {
    if (loggedUserId !== userID) {
      throw new AppError("You don't own this user, can't change password", 400);
    }
    body.password = hashSync(body.password ?? "", 10);
  }

  await userRepository.save({ id: userID, ...body });

  const userToReturn = await userRepository.findOne({
    where: { id: userID },
  });

  const userWithoutPassord = await userUpdatedSchema.validate(userToReturn, {
    stripUnknown: true,
  });

  return userWithoutPassord;
};
export default updateUserService;
