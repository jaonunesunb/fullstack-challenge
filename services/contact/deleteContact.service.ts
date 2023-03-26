import AppDataSource from "../../data-source";
import { Contact } from "../../entities/Contact";
import AppError from "../../errors/AppError";

export const deleteContactService = async (id: number) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({ where:
    {id: id}
  });

  if (!contact) {
    throw new AppError("Invalid id", 404);
  }

  await contactRepository
    .createQueryBuilder("contact")
    .delete()
    .where("id = :id", { id: id })
    .execute();
};
