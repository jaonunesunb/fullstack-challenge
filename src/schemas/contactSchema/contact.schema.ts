import * as yup from "yup";

const ContactSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  created_at: yup.date(),
  updated_at: yup.date(),
  client_id: yup.number().required(),
});

const updateContactSchema = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  phone: yup.string().notRequired(),
});

const allContactResponseSchema = yup.array(ContactSchema);

export { ContactSchema, updateContactSchema, allContactResponseSchema };
