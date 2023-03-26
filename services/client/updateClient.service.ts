import { Client } from '../../entities/Client';
import { IClientUpdate } from '../../interfaces/client';
import { clientUpdateSchema } from '../../schemas/clientSchemas/clients.schema';
import AppError from '../../errors/AppError';
import AppDataSource from '../../data-source';

const updateClientService = async ({ name, email, phone }: IClientUpdate, id: number) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOne({ where: { id } });

  if (!client) {
    throw new AppError('Client not found', 404);
  }

  client.name = name ?? client.name;
  client.email = email ?? client.email;
  client.phone = phone ?? client.phone;

  await clientRepository.save(client);

  const validatedUpdatedClient = await clientUpdateSchema.validate(client, {
    stripUnknown: true,
  });

  return validatedUpdatedClient;
};

export default updateClientService;
