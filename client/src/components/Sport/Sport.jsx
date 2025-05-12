import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSportByIdAsync } from "../../store/sportsSlice";

const Sport = () => {
  const { sportId } = useParams();
  const dispatch = useDispatch();
  const { selectedSport, isLoading, error } = useSelector(
    (state) => state.sports
  );

  useEffect(() => {
    dispatch(fetchSportByIdAsync(sportId));
  }, [dispatch, sportId]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <article>
      <h2>{selectedSport?.name}</h2>
      <img src={selectedSport?.image} />
    </article>
  );
};

export default Sport;
