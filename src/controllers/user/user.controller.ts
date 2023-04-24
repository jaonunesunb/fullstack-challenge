import { Request, Response } from "express";
import { IUser, IUserRequest, IUserUpdate } from "../../interfaces/user";
import createUserService from "../../services/user/createUser.service";
import updateUserService from "../../services/user/updateUser.service";
import getUsersService from "../../services/user/getUsers.service";
import deleteUserService from "../../services/user/deleteUser.service"


const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

const userListController = async (req: Request, res: Response) => {
  const users = await getUsersService();
  return res.status(200).json(users);
};

const updatedUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user: IUserUpdate = req.body;

  const updatedUser = await updateUserService(user, req.params.id,
    req.user.id);

  return res.status(200).json({
    message: "User Updated",
    user: updatedUser,
  });
};

 const deleteUserController = async (
  request: Request,
  response: Response
) => {
  const userId: string = request.params.id;
  const deletedUser = await deleteUserService(userId);
  
  return response.status(204).json(deletedUser);
};
  
export {
  createUserController,
  userListController,
  updatedUserController,
  deleteUserController,
};