import express from "express";
import {
  createContactController,
  contactListController,
  deleteContactController,
  updatedContactController,
  getContactByIdController,
} from "../controllers/contact/contact.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import cors from "cors";

const contactRoutes = express.Router();
contactRoutes.use(cors());

contactRoutes.get("/", ensureAuthMiddleware, contactListController);
contactRoutes.get("/:id", ensureAuthMiddleware, getContactByIdController);
contactRoutes.post("/", ensureAuthMiddleware, createContactController);
contactRoutes.patch("/:id", ensureAuthMiddleware, updatedContactController);
contactRoutes.delete("/:id", ensureAuthMiddleware, deleteContactController);

export default contactRoutes;
