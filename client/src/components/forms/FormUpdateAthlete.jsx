import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateValidationShema } from "../../validation/athlete.validate";
import styles from "./form.module.scss";
import CONSTANTS from "../../constants";
import { fetchAllSportsAsync } from "../../store/sportsSlice";
import { updateAthleteByIdAsync } from "../../store/athletesSlice";

const FormUpdateAthlete = ({ athlete, handleShowForm }) => {
  const dispatch = useDispatch();
  const { sports } = useSelector((state) => state.sports);
  useEffect(() => {
    dispatch(fetchAllSportsAsync());
  }, [dispatch]);
  const onsubmit = (values) => {
    dispatch(updateAthleteByIdAsync({ id: athlete._id, formData: values }));
    handleShowForm();
  };
  const initialValues = {
    name: athlete?.name || "",
    country: athlete?.country || "",
    birthYear: athlete?.birthYear || "",
    sportId: athlete?.sportId._id || "",
    avatar: "",
  };
  const showCountry = (country) => (
    <option key={country} value={country}>
      {country}
    </option>
  );
  const showSport = (sport) => (
    <option key={sport._id} value={sport._id}>
      {sport.name}
    </option>
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onsubmit}
      validationSchema={updateValidationShema}
    >
      {({ setFieldValue, values }) => {
        return (
          <Form className={styles.form}>
            <label>
              <span>Name of Athlete</span>
              <Field name="name" />
              <ErrorMessage name="name" />
            </label>

            <label>
              <span>Country</span>
              <select
                name="country"
                value={values.country}
                onChange={(event) => {
                  setFieldValue(
                    "country",
                    event.currentTarget.selectedOptions[0].value
                  );
                }}
              >
                <option value=""> choose country</option>
                {CONSTANTS.COUNTRIES.map(showCountry)}
              </select>
              <ErrorMessage name="country" />
            </label>

            <label>
              <span>Birth Year</span>
              <Field
                name="birthYear"
                type="number"
                min="1900"
                max={new Date().getFullYear() - 15}
              />
              <ErrorMessage name="birhYear" />
            </label>

            <label>
              <span>Sport</span>
              <select
                name="sportId"
                value={values.sportId}
                onChange={(event) => {
                  setFieldValue(
                    "sportId",
                    event.currentTarget.selectedOptions[0].value
                  );
                }}
              >
                <option>choose sport</option>
                {sports?.map(showSport)}
              </select>
              <ErrorMessage name="sportId" />
            </label>

            <label>
              <span>Add picture</span>
              <input
                name="avatar"
                type="file"
                onChange={(event) => {
                  setFieldValue("avatar", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="avatar" />
            </label>

            <button type="submit"> Update athlete</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormUpdateAthlete;
