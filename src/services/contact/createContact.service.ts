import { IContactRequest } from "../../interfaces/contact";
import AppDataSource from "../../data-source";
import { ContactResponseSchema } from "../../schemas/contactSchema/contact.schema";
import AppError from "../../errors/AppError";
import { Contact } from "../../entities/Contact";

const createContactService = async (contactData: IContactRequest) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const existingContact = await contactRepository.findOne({
    where: { email: contactData.email },
  });

  if (existingContact) {
    throw new AppError("Contact already registered", 409);
  }

  const createdContact = contactRepository.create(contactData);

  await contactRepository.save(createdContact);

  const validatedContact = await ContactResponseSchema.validate(createdContact, {
    stripUnknown: true,
  });

  return validatedContact;
};

export default createContactService;
