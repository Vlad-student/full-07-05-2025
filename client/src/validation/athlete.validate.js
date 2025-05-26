import * as Yup from "yup";
import { schemaImage } from "./validate";
import CONSTANTS from "../constants";

const nameShema = Yup.string().trim().min(6).max(255);
const countryShema = Yup.string().oneOf(CONSTANTS.COUNTRIES);
const birthShema = Yup.number()
  .min(1900)
  .max(new Date().getFullYear() - 15);

export const createValidationShema = Yup.object({
  name: nameShema.required(),
  country: countryShema.required(),
  birthYear: birthShema.required(),
  sportId: Yup.string().required(),
  avatar: schemaImage,
});

export const updateValidationShema = Yup.object({
  name: nameShema,
  country: countryShema,
  birthYear: birthShema,
  avatar: schemaImage,
});
