import { message } from "antd";
import { applyZodErrorsToForm } from "./formError.util";

/**
 * Handles form submission with Zod validation and error handling
 * @param {Object} options - Configuration options
 * @param {Object} options.values - Form values to transform
 * @param {ZodSchema} options.schema - Zod schema for validation
 * @param {Function} options.onSubmit - Mutation/submit function to call with validated data
 * @param {FormInstance} options.form - Ant Design form instance for error display
 * @param {Object} options.messages - Custom error messages (optional)
 */
export const handleFormSubmission = async ({
  values,
  schema,
  onSubmit,
  form,
  messages = {},
}) => {
  console.log("schema", schema);

  try {
    // Validate with Zod schema
    const parsedData = schema.parse(values);

    // Call the submission function
    await onSubmit(parsedData);
  } catch (err) {
    console.log("parsed", err);
    if (err.name === "ZodError") {
      applyZodErrorsToForm(form, err);
      console.log(err);
      message.error(messages.zodError || "Fix the errors and try again.");
    } else {
      message.error(
        messages.genericError || err?.message || "Something went wrong"
      );
    }
  }
};

/**
 * Creates a submit handler for a specific form
 * Useful when you want to pre-configure the submission handler
 */
export const createFormSubmitHandler = (config) => {
  return (values) => handleFormSubmission({ ...config, values });
};
