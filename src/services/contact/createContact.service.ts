import { IContactRequest } from "../../interfaces/contact";
import AppDataSource from "../../data-source";
import { ContactResponseSchema } from "../../schemas/contactSchema/contact.schema";
import AppError from "../../errors/AppError";
import { Contact } from "../../entities/Contact";
import { User } from "../../entities/User";

const createContactService = async (
  contactData: IContactRequest,
  userId: string
) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);

  if (!contactData.name || !contactData.email) {
    throw new AppError("Name and email are required", 400);
  }

  const existingContact = await contactRepository.findOne({
    where: { email: contactData.email },
  });

  if (existingContact) {
    throw new AppError("Contact already registered", 409);
  }

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const createdContact = contactRepository.create({
    ...contactData,
    user,
  });

  await contactRepository.save(createdContact);

  const validatedContact = await ContactResponseSchema.validate(
    createdContact,
    {
      stripUnknown: true,
    }
  );

  return validatedContact;
};

export default createContactService;
