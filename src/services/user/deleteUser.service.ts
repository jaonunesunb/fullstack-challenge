import AppDataSource from "../../data-source";
import { User } from "../../entities/User";
import AppError from "../../errors/AppError";

const deleteUserService = async (userID: string) => {
  const usersRepo = AppDataSource.getRepository(User);

  const res = await usersRepo
    .createQueryBuilder()
    .delete()
    .where("id = :id", { id: userID })
    .execute();
};

export default deleteUserService;
