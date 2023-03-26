import { IClient } from "../../interfaces/client";
import AppDataSource from "../../data-source";
import { ClientWithContactsSchema } from "../../schemas/clientSchemas/clients.schema";
import { Client } from "../../entities/Client";
import AppError from "../../errors/AppError";

const createClientService = async (clientData: IClient) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const existingClient = await clientRepository.findOne({ where: { email: clientData.email } });
  if (existingClient) {
    throw new AppError("Email already registered for another client", 409);
  }

  const createdClient = clientRepository.create(clientData);

  await clientRepository.save(createdClient);

  const response = await clientRepository.find({
    where: { id: createdClient.id },
    relations: ["contacts"],
  });
  
  const validatedClient = await ClientWithContactsSchema.validate(response, { stripUnknown: true });

  return validatedClient;
};

export default createClientService;
