import React, { useEffect, useState } from "react";

import CustomLink from "../../hooks/navigation/CustomLink";
import useAuthService from "../../services/auth/useAuthService";
import { useNavigate } from "react-router-dom";
import useUserInformation from "../../hooks/authenticate/useUserInformation";

export default function NavigationRouter({ isMenuOpen, setIsMenuOpen }) {
  const userStatus = useUserInformation();
  const { clearAllCookies } = useAuthService();
  const navigate = useNavigate();
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => {
    // const timeoutId = setTimeout(() => {
    //   setIsComponentMounted(true);
    // }, 1000);
    // // Cleanup function to clear the timeout
    // return () => clearTimeout(timeoutId);
  }, []);

  const logoutAction = () => {
    clearAllCookies("authUserToken");
    const newUserStatus = {
      userInformation: null,
      isLoggedIn: false,
    };
    userStatus.updateStatusAccount(newUserStatus);
    navigate("/signin");
  };
  return (
    <nav className={`nav ${isMenuOpen ? "move-down" : "move-up"}`}>
      <span
        className="small-txt txt-center"
        style={{
          display: "block",
          margin: "12px auto",
          fontWeight: "500",
          width: "100%",
          color: "#000",
        }}
      >
        👋{" "}
        <span style={{ fontWeight: "700" }}>
          {" "}
          {userStatus.statusAccount.userInformation.firstName}{" "}
          {userStatus.statusAccount.userInformation.lastName}
        </span>
      </span>
      <ul>
        <CustomLink to="/" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          Content
        </CustomLink>
        <CustomLink to="/my-content" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          My Content
        </CustomLink>
        <CustomLink
          to="/access-track"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Access Tracking
        </CustomLink>
        <CustomLink
          to="/subscribers-track"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Subscriptions Tracking
        </CustomLink>
        {userStatus.statusAccount.userInformation.userType === "admin" && (
          <CustomLink
            to="/admin-access"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Admin Access
          </CustomLink>
        )}
        {userStatus.statusAccount.userInformation.userType === "admin" && (
          <CustomLink
            to="/admin-subscription"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Admin Subscription Tracking
          </CustomLink>
        )}
        <li
          onClick={() => {
            logoutAction();
          }}
        >
          <a href="#">Log Out</a>
        </li>
      </ul>
    </nav>
  );
}
