import React from "react";
import { useNavigate } from "react-router-dom";
import { mdiDeleteOutline } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useDispatch } from "react-redux";
import { deleteSportByIdAsync } from "../../store/sportsSlice";

const SportItem = ({ sport }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToSport = () => {
    navigate(`/sports/${sport._id}`);
  };
  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteSportByIdAsync(sport._id));
  };
  return (
    <li onClick={navigateToSport} key={sport._id}>
      {sport.name}
      <Icon onClick={handleDelete} path={mdiDeleteOutline} size={0.8} />
    </li>
  );
};

export default SportItem;
