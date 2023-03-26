import * as yup from "yup";
import { IUser } from "../../interfaces/user";
import type { Schema } from 'yup';

export const userSchema: Schema<Omit<IUser, "id" | "createdAt" | "updatedAt">, any, any, ''> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().min(6).required(),
  isAdm: yup.boolean().required(),
});

export const userUpdatedSchema = yup
  .object({
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    password: yup.string().notRequired(),
  })
  .defined();

export const userWithoutPasswordSchema = yup
  .object({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    isAdm: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired().nullable(),
  })
  ;

export const allUserResponseSchema = yup
  .array(userWithoutPasswordSchema)
  .defined();