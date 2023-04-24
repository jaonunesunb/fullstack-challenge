import { Router } from "express";
import { createSessionController } from "../controllers/login/login.controller";
import express from "express";
import cors from "cors";

const sessionRoutes = Router();
sessionRoutes.use(cors());

sessionRoutes.post("/", createSessionController);

export default sessionRoutes;
