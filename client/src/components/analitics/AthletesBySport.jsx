import React, { useEffect } from "react";
import { fetchAthletesBySportAsync } from "../../store/analiticsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";


const AthletesBySport = () => {
  const dispatch = useDispatch();
  const { isLoading, error, athletesBySport } = useSelector(
    (state) => state.analitics
  );
  useEffect(() => {
    dispatch(fetchAthletesBySportAsync());
  }, [dispatch]);
  return (
    <section>
      <h2>Amount athletes in each sport</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {athletesBySport.length === 0 ? (
        <p>rmpty data</p>
      ) : (
        <ResponsiveContainer width="75%" height={400}>
          <BarChart data={athletesBySport}>
            <XAxis dataKey="sport" />
            <YAxis />
            <Bar dataKey="count" fill="green" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
        // athletesBySport.map((data) => (
        //   <p key={data.sport}>
        //     {data.sport} - {data.count}
        //   </p>
        // ))
      )}
    </section>
  );
};

export default AthletesBySport;
