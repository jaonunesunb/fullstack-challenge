import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./routers/user.routes";
import sessionRoutes from "./routers/session.routes";
import contactRoutes from "./routers/contact.routes";
import handleError from "./errors/handlerror";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/contacts", contactRoutes);
app.use(handleError);

export default app;
