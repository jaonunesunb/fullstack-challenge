import { Router } from "express";
import {
  createUserController,
  userListController,
  updatedUserController,
  deleteUserController,
  getUserByIdController,
} from "../controllers/user/user.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { regexUuidValidation } from "../middlewares/regexValidation.middleware";
import { userSchema } from "../schemas/userSchemas/userSchemas";

const userRoutes = Router();

userRoutes.post(
  "/register",
  ensureDataIsValidMiddleware(userSchema),
  createUserController
);

userRoutes.get("", ensureAuthMiddleware, userListController);

userRoutes.patch(
  "/:id",
  regexUuidValidation,
  ensureAuthMiddleware,
  updatedUserController
);

userRoutes.get("/:id", ensureAuthMiddleware, getUserByIdController);

userRoutes.delete("/:id", ensureAuthMiddleware, deleteUserController);

export default userRoutes;
