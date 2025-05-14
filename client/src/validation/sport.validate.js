import * as Yup from "yup";
import CONSTANTS from "../constants";

export const createValidationShema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[A-z][a-z]{2,63}$/, "Upper first letter")
    .required(),
  isOlimpic: Yup.boolean(),
  image: Yup.mixed()
    .test("fileSize", "Size must be less 5MB", (value) => {
      return !value || value.size <= CONSTANTS.MAX_FILE_SIZE;
    })
    .test("fileType", "File not available", (value) => {
      return !value || CONSTANTS.FILE_TYPES.includes(value.type);
    }),
});
