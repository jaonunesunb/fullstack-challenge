import { Router } from "express";
import { createSessionController } from "../controllers/login/login.controller";

const sessionRoutes = Router();

sessionRoutes.post("/", createSessionController);

export default sessionRoutes;
