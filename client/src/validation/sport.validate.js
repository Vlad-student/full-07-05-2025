import * as Yup from "yup";
import CONSTANTS from "../constants";

const schemaName = Yup.string()
  .trim()
  .matches(/^[A-z][a-z]{2,63}$/, "Upper first letter");

const schemaImage = Yup.mixed()
  .test("fileSize", "Size must be less 5MB", (value) => {
    return !value || value.size <= CONSTANTS.MAX_FILE_SIZE;
  })
  .test("fileType", "File not available", (value) => {
    return !value || CONSTANTS.FILE_TYPES.includes(value.type);
  });

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
