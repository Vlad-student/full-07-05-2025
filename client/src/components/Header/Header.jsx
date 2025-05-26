import React from "react";
import { Link } from "react-router-dom";
import "./Header.module.scss";

const Header = () => {
  return (
    <div>
      <header>
        <Link to="/"> Logo </Link>
        <Link to="/create-sport"> Create sport </Link>
        <Link to="/create-athlete"> Create Athlete</Link>
        <Link to="/analitics"> Analitics </Link>
      </header>
    </div>
  );
};

export default Header;
