import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSportByIdAsync } from "../../store/sportsSlice";
import CONSTANTS from "../../constants";
import FormUpdateSport from "../forms/FormUpdateSport";
import AthleteList from "../AthleteList/AthleteList";

const Sport = () => {
  const { sportId } = useParams();
  const dispatch = useDispatch();
  const { selectedSport, isLoading, error } = useSelector(
    (state) => state.sports
  );

  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowListAthletes, setIsShowListAthletes] = useState(false);
  const handleShowForm = () => {
    setIsShowForm(!isShowForm);
  };
  const handleShowListAthletes = () => {
    setIsShowListAthletes(!isShowListAthletes);
  };

  useEffect(() => {
    dispatch(fetchSportByIdAsync(sportId));
  }, [dispatch, sportId]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <article>
      <h2>{selectedSport?.name}</h2>
      <p>{selectedSport?.isOlimpic ? "olimpic" : "not olimpic"}</p>
      <img
        src={`${CONSTANTS.API_BASE_URL}${selectedSport?.image}`}
        alt={selectedSport?.name}
      />
      <div>
        {" "}
        <button onClick={handleShowForm}>
          {isShowForm ? "hide" : "show"} update sport
        </button>
        {isShowForm && (
          <FormUpdateSport
            sport={selectedSport}
            handleShowForm={handleShowForm}
          />
        )}
        <button onClick={handleShowListAthletes}>
          {isShowListAthletes ? "hide" : "show"} show list athletes
        </button>
        {isShowListAthletes && (
          <AthleteList athletes={selectedSport.athletes} />
        )}
      </div>
    </article>
  );
};

export default Sport;
