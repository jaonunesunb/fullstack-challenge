import AppDataSource from "../../data-source";
import { Contact } from "../../entities/Contact";
import { IContactUpdate } from "../../interfaces/Contact";

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

  await contactRepository.update(id, {
    name: name ?? findContact.name,
    email: email ?? findContact.email,
    phone: phone ?? findContact.phone,
  });

  const updatedContact = await contactRepository.findOneBy({
    id: parseInt(id),
  });

  return updatedContact ?? null;
};

export default updateContactService;
