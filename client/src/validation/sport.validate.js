import * as Yup from "yup";

export const createValidationShema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[A-z][a-z]{2,63}$/, "Upper first letter")
    .required(),
  isOlimpic: Yup.boolean(),
});
