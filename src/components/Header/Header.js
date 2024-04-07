import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles/header-style.css";
import Logo from "./Logo.js";
import useUserInformation from "../../hooks/authenticate/useUserInformation.js";
import SettingsMenu from "./SettingsMenu.js";

export default function Header() {
  const userInformation = useUserInformation();

  return (
    <>
      {userInformation.statusAccount.isLoggedIn ? (
        <header className="header-comp">
          <div className="navigation-comp">
            <Link to="/" className="nav-title">
              <Logo />
            </Link>
            <SettingsMenu />
          </div>
        </header>
      ) : null}
    </>
  );
}
