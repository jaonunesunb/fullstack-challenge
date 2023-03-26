import AppDataSource from "../../data-source";
import { allUserResponseSchema } from "../../schemas/userSchemas/userSchemas";
import { User } from "../../entities/user";
const getUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  const allUserResponse = await allUserResponseSchema.validate(users, {
    stripUnknown: true,
  });

  return allUserResponse;
};
export default getUsersService;
