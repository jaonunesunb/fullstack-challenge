import { IContact } from "../../interfaces/Contact";
import AppDataSource from "../../data-source";
import { Contact } from "../../entities/Contact";
import { Client } from "../../entities/Client";
import { ContactSchema } from "../../schemas/contactSchema/contact.schema";
import AppError from "../../errors/AppError";
import { DeepPartial } from "typeorm";

const createContactService = async (contactData: IContact) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  const existingContact = await contactRepository.findOne({
    where: { email: contactData.email },
  });

  if (existingContact) {
    throw new AppError("Contact already registered", 409);
  }

  const client = await clientRepository.findOne({
    where: { id: contactData.clientId },
  });

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  const createdContact = contactRepository.create({
    ...contactData,
    client: client,
  } as DeepPartial<Contact>);

  await contactRepository.save(createdContact);

  const validatedContact = await ContactSchema.validate(createdContact, {
    stripUnknown: true,
  });

  return validatedContact;
};

export default createContactService;
