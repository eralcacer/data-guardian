import React from "react";

import "./styles/header-style.css";
import LogoShield from "../../imgs/shield.png";

export default function Logo() {
  return (
    <div className="logo-comp mid-center">
      <img className="logo-img" src={LogoShield} alt="DataGuardian Logo" />
      <h2 className="title">DataGuardian</h2>
    </div>
  );
}
