import AppDataSource from "../../data-source";
import { Contact } from "../../entities/Contact";
import { IContactUpdate } from "../../interfaces/contact";

const updateContactService = async (
  { name, email, phone }: IContactUpdate,
  id: string
): Promise<Contact | null> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOneBy({
    id: parseInt(id),
  });

  if (!findContact) {
    return null;
  }

  const updatedFields: Partial<IContactUpdate> = {};

  if (name) {
    updatedFields.name = name;
  }

  if (email) {
    const existingContact = await contactRepository.findOne({
      where: { email },
    });

    if (existingContact && existingContact.id !== parseInt(id)) {
      throw new Error("Este email já está cadastrado para outro contato");
    }

    updatedFields.email = email;
  }

  if (phone) {
    updatedFields.phone = phone;
  }

  await contactRepository.update(id, updatedFields);

  const updatedContact = await contactRepository.findOneBy({
    id: parseInt(id),
  });

  return updatedContact ?? null;
};

export default updateContactService