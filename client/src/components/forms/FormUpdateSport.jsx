import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { updateSportByIdAsync } from "../../store/sportsSlice";
import { updateValidationShema } from "../../validation/sport.validate";
import styles from "./form.module.scss";

const FormUpdateSport = ({ sport, handleShowForm }) => {
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    console.log(values);
    const formData = new FormData();
    if (values.name) {
      formData.append("name", values.name);
    }
    if (values.isOlimpic) {
      formData.append("isOlimpic", values.name);
    }
    if (values.image) {
      formData.append("image", values.name);
    }
    dispatch(updateSportByIdAsync({ id: sport._id, formData }));
    handleShowForm();
  };
  const initialValues = {
    name: sport.name || "",
    isOlimpic: sport.isOlimpic || false,
    image: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateValidationShema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => {
        const handleImage = (event) => {
          setFieldValue("image", event.currentTarget.files[0]);
        };
        return (
          <Form className={styles.form}>
            <label>
              <span>Name of sport</span>
              <Field name="name" />
              <ErrorMessage name="name" />
            </label>

            <label>
              <span>Olimpic or not</span>
              <Field name="isOlimpic" type="checkbox" />
              <ErrorMessage name="name" />
            </label>

            <label>
              <span>Add picture</span>
              <input type="file" name="image" onChange={handleImage} />
              <ErrorMessage name="image" />
            </label>
            <button type="submit">update form</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormUpdateSport;
