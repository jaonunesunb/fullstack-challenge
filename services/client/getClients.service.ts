import AppDataSource from "../../data-source";
import { allClientsResponseSchema } from "../../schemas/clientSchemas/clients.schema";
import { Client } from "../../entities/Client";

interface AllClientsResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string | null;
  contacts: {
    id: number;
    name: string;
    email: string;
    phone: string;
    clientId: number;
  }[];
}

const getClientsService = async (): Promise<AllClientsResponse[]> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const clients = await clientRepository.find({
    relations: ["contacts"],
  });

  const allClientsResponse = await allClientsResponseSchema.validate(clients, {
    stripUnknown: true,
  }) as unknown as AllClientsResponse[];

  return allClientsResponse;
};

export default getClientsService;
