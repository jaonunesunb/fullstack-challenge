import { Request, Response } from "express";
import { IClient, IClientUpdate } from "../../interfaces//client";
import createClientService from "../../services/client/createClient.service";
import updateClientService from "../../services/client/updateClient.service";
import getClientsService from "../../services/client/getClients.service";
import deleteClientService from "../../services/client/deleteClient.service";
import getClientWithContactsService from "../../services/client/getClientById.service";

const createclientController = async (req: Request, res: Response) => {
  const clientData: IClient = req.body;
  const newClient = await createClientService(clientData);
  return res.status(201).json(newClient);
};

const clientListController = async (req: Request, res: Response) => {
  const clients = await getClientsService();

  return res.status(200).json(clients);
};

const getClientByIdController = async (req: Request, res: Response) => {
  const client = await getClientWithContactsService(parseInt(req.params.id));

  return res.status(200).json(client);
};

const updatedclientController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const client: IClientUpdate = req.body;

  const updatedClient = await updateClientService(client, id);

  return res.status(200).json({
    message: "client Updated",
    client: updatedClient,
  });
};

const deleteclientController = async (req: Request, res: Response) => {
  await deleteClientService(parseInt(req.params.id));

  return res.status(204).json();
};

export {
  createclientController,
  clientListController,
  updatedclientController,
  deleteclientController,
  getClientByIdController,
};
