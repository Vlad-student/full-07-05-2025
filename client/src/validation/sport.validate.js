import * as Yup from "yup";
import { schemaImage } from "./validate";

const schemaName = Yup.string()
  .trim()
  .matches(/^[A-z][a-z]{2,63}$/, "Upper first letter");

export const createValidationShema = Yup.object({
  name: schemaName.required(),
  isOlimpic: Yup.boolean(),
  image: schemaImage,
});

export const updateValidationShema = Yup.object({
  name: schemaName,
  isOlimpic: Yup.boolean(),
  image: schemaImage,
});
