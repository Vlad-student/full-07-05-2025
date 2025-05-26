import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateAthleteAsync } from "./../../store/athletesSlice";
import { createValidationShema } from "../../validation/athlete.validate";
import CONSTANTS from "../../constants";
import styles from "./form.module.scss";
import { fetchAllSportsAsync } from "../../store/sportsSlice";
import { useNavigate } from "react-router-dom";

const FormCreateAthlete = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sports } = useSelector((state) => state.sports);
  useEffect(() => {
    dispatch(fetchAllSportsAsync());
  }, [dispatch]);
  const onSubmit = (values, formikBag) => {
    dispatch(fetchCreateAthleteAsync(values));
    formikBag.resetForm();
    navigate(`/sports/${values.sportId}`);
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
      initialValues={{
        name: "",
        country: "",
        birthYear: 2000,
        sportId: "",
        avatar: "",
      }}
      onSubmit={onSubmit}
      validationSchema={createValidationShema}
    >
      {({ setFieldValue }) => {
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

            <button type="submit"> Create new athlete</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormCreateAthlete;
