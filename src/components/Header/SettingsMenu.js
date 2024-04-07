import React, { useState } from "react";

import NavigationRouter from "./NavigationRouter.js";
import useUserInformation from "../../hooks/authenticate/useUserInformation.js";

export default function SettingsMenu() {
  const userAccountStatus = useUserInformation();
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  return (
    <>
      <div className="settings-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={`bi bi-three-dots ${
            isMenuOpen ? "rotate-down" : "rotate-up"
          }`}
          viewBox="0 0 16 16"
          style={{ marginRight: "12px" }}
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
        </svg>
        {userAccountStatus.statusAccount.userInformation?.profilePicture ? (
          <div className="icon-profile">
            <img
              className="img-icon"
              src={
                userAccountStatus.statusAccount.userInformation.profilePicture
              }
              alt="My Profile"
            />
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        )}
      </div>
      <NavigationRouter isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}
