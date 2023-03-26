import { Contact } from "../../entities/Contact";
import AppDataSource from "../../data-source";

export async function getContactByIdService(id: string): Promise<Contact> {
  const contactRepository = AppDataSource.getRepository(Contact);
  const findContact = await contactRepository.findOneBy({
    id: parseInt(id),
  });

  if (!findContact) {
    throw new Error(`Contact with id ${id} not found`);
  }

  return findContact;
}
