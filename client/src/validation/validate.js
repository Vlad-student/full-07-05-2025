import CONSTANTS from "../constants";
import  * as Yup  from 'yup';

export const schemaImage = Yup.mixed()
  .test("fileSize", "Size must be less 5MB", (value) => {
    return !value || value.size <= CONSTANTS.MAX_FILE_SIZE;
  })
  .test("fileType", "File not available", (value) => {
    return !value || CONSTANTS.FILE_TYPES.includes(value.type);
  });