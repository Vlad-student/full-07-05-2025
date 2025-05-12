import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSportsAsync } from "../../store/sportsSlice";
import SportItem from "./SportItem";

const SportsList = () => {
  const dispatch = useDispatch();
  const { sports, error, isLoading } = useSelector((state) => state.sports);

  useEffect(() => {
    dispatch(fetchAllSportsAsync());
    return () => {};
  }, [dispatch]);

  const showSport = (sport) => <SportItem key={sport._id} sport={sport} />;

  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Loading...</p>;
  if (sports) {
    return (
      <section>
        <h2>Sports:</h2>
        <ul> {sports.map(showSport)}</ul>
      </section>
    );
  }
  return <div></div>;
};

export default SportsList;
