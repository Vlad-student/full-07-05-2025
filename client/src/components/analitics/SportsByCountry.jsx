import React, { useEffect } from "react";
import { fetchSportsByCountryAsync } from "../../store/analiticsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";
import styles from "../analitics/analitics.module.scss";

const SportsByCountry = () => {
  const dispatch = useDispatch();
  const { isLoading, error, sportsByCountry } = useSelector(
    (state) => state.analitics
  );
  useEffect(() => {
    dispatch(fetchSportsByCountryAsync());
  }, [dispatch]);
  return (
    <section className={styles.analitics}>
      <h2>Amount sports by country</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {sportsByCountry.length === 0 ? (
        <p>empty data</p>
      ) : (
        <ResponsiveContainer width="75%" height={400}>
          <BarChart data={sportsByCountry}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Bar dataKey="amount" fill="red" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};

export default SportsByCountry;
