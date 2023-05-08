import { User } from "../../entities/User";
import AppDataSource from "../../data-source";

const getUserByIdService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });
  return user;
};

export default getUserByIdService;
