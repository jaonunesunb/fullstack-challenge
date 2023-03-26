import AppDataSource from "../../data-source";
import { Client } from "../../entities/Client";
import AppError from "../../errors/AppError";

const deleteClientService = async (id: number) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: { id },
    relations: ["contacts"],
  });

  if (!client) {
    throw new AppError("Invalid id", 404);
  }

  await clientRepository.remove(client);
};

export default deleteClientService;
