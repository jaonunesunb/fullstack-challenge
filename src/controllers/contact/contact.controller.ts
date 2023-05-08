import { Request, Response } from "express";
import {
  IContactRequest,
  IContactResponse,
  IContactUpdate,
} from "../../interfaces/contact";
import createContactService from "../../services/contact/createContact.service";
import updateContactService from "../../services/contact/updateContact.service";
import getContactService from "../../services/contact/getContact.service";
import { deleteContactService } from "../../services/contact/deleteContact.service";
import { getContactByIdService } from "../../services/contact/getContactById.service";

const createContactController = async (req: Request, res: Response) => {
  const contactData: IContactRequest = req.body;
  const newContact = await createContactService(contactData, req.user.id);
  return res.status(201).json(newContact);
};

const contactListController = async (req: Request, res: Response) => {
  const contacts = await getContactService();

  return res.status(200).json(contacts);
};

const getContactByIdController = async (req: Request, res: Response) => {
  const client = await getContactByIdService(req.params.id);

  return res.status(200).json(client);
};

const updatedContactController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const contact: IContactUpdate = req.body;

  const updatedContact = await updateContactService(contact, id);

  return res.status(200).json({
    message: "Contact Updated",
    Contact: updatedContact,
  });
};

const deleteContactController = async (req: Request, res: Response) => {
  await deleteContactService(parseFloat(req.params.id));

  return res.status(204).json();
};

export {
  createContactController,
  contactListController,
  getContactByIdController,
  updatedContactController,
  deleteContactController,
};
