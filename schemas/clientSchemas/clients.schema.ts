import * as yup from "yup";

import { ContactSchema } from "../contactSchema/contact.schema";

const clientUpdateSchema = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  phone: yup.string().notRequired(),
});

const ClientSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  created_at: yup.date(),
  updated_at: yup.date(),
  contacts: yup.array().of(ContactSchema),
});
const ClientWithContactsSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  created_at: yup.date(),
  updated_at: yup.date(),
  contacts: yup.array().of(ContactSchema),
});


const allClientsResponseSchema = yup.array(ClientSchema);

export { clientUpdateSchema, ClientSchema, ClientWithContactsSchema, allClientsResponseSchema };
