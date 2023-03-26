import AppDataSource from "../../data-source";
import { allContactResponseSchema } from "../../schemas/contactSchema/contact.schema";
import { Contact } from "../../entities/Contact";

const getContactsService = async () => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contacts = await contactRepository.find();
  const validatedContacts = await allContactResponseSchema.validate(contacts, {
    stripUnknown: true,
  });

  return validatedContacts;
};

export default getContactsService;
