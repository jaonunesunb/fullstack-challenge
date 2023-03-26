import { Repository } from "typeorm";
import { Client } from "../../entities/Client";
import { Contact } from "../../entities/Contact";
import AppError from "../../errors/AppError";
import { ClientWithContactsResponse } from "../../interfaces/client";
import { getRepository } from "typeorm";

const getClientWithContactsService = async (
  clientId: number,
): Promise<ClientWithContactsResponse> => {
  const clientRepository = getRepository(Client);
  const contactRepository = getRepository(Contact);

  const client = await clientRepository.findOneOrFail({ where: {id: clientId},
    relations: ["contacts"],
    order: { name: "ASC" },
  });

  const contacts = client.contacts.map((contact) => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
  }));

  return {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    createdAt: client.createdAt.toISOString(),
    updatedAt: client.updatedAt ? client.updatedAt.toISOString() : null,
    contacts,
  };
};

export default getClientWithContactsService;

