import express from "express";
import {
  createclientController,
  clientListController,
  updatedclientController,
  deleteclientController,
  getClientByIdController,
} from "../controllers/client/client.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const clientsRoutes = express.Router();

clientsRoutes.get("/", ensureAuthMiddleware, clientListController);
clientsRoutes.get("/:id", ensureAuthMiddleware, getClientByIdController);
clientsRoutes.post("/", ensureAuthMiddleware, createclientController);
clientsRoutes.patch("/:id", ensureAuthMiddleware, updatedclientController);
clientsRoutes.delete("/:id", ensureAuthMiddleware, deleteclientController);

export default clientsRoutes;
