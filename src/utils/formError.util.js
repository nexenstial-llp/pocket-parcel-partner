import toast from "react-hot-toast";
import { removeUnderscores } from "./typography.util";

/**
 * Applies Zod validation errors to Ant Design form instance
 * @param {import('antd').FormInstance} form - Ant Design form instance
 * @param {import('zod').ZodError} zodError - Zod validation error
 */
export const applyZodErrorsToForm = (form, zodError) => {
  if (!zodError?.issues) return;
  const fields = zodError.issues.map((issue) => ({
    name: issue.path[0],
    errors: [issue.message],
  }));
  fields.map((field) => {
    toast.error(`${removeUnderscores(field.name)}: \n ${field.errors[0]}`);
  });
  form.setFields(fields);
};
