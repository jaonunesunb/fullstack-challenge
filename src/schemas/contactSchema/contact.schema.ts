import * as yup from "yup";

const ContactRequestSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  created_at: yup.date(),
  updated_at: yup.date()
});

const ContactResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  created_at: yup.date(),
  updated_at: yup.date(),
  client_id: yup.number(),
});

const updateContactSchema = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  phone: yup.string().notRequired(),
});

const allContactResponseSchema = yup.array(ContactResponseSchema);

export { ContactRequestSchema, updateContactSchema, ContactResponseSchema, allContactResponseSchema };
