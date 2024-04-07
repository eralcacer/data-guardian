import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import ContentPage from "./ContentPage";
import LoginPage from "../Authentication/LoginPage";
import SignUpPage from "../Authentication/SignUpPage";
import useUserInformation from "../../hooks/authenticate/useUserInformation.js";
import LoaderComponent from "../../components/loader/LoaderComponent.js";
import UserService from "../../services/auth/useAuthService.js";
import ForgotPassword from "../Authentication/ForgotPassword";

export default function Home() {
  const navigate = useNavigate();
  const userInformation = useUserInformation();
  const { postAuthenticateUserToken } = UserService();
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => {
    if (!isComponentMounted) {
      authenticateUserWithSavedToken();
    } else if (
      !userInformation.isLoggedIn &&
      window.location.href.split[3] !== "change-password"
    ) {
      navigate("/signin");
    }
  }, [userInformation.isLoggedIn]);

  const authenticateUserWithSavedToken = async () => {
    const responseAuthentication = await postAuthenticateUserToken();
    if (responseAuthentication && responseAuthentication.data.success) {
      userInformation.updateStatusAccount({
        ...responseAuthentication.data.userInformation,
        isLoggedIn: true,
      });
    } else if (
      (!responseAuthentication || !responseAuthentication.data?.success) &&
      (window.location.href.split("/")[3].split("?")[0] === "change-password" ||
        window.location.href.split("/")[3] === "signup")
    ) {
    } else {
      navigate("/signin");
    }
    setIsComponentMounted(true);
  };
  return (
    <>
      <Header />
      <div className="component">
        {!isComponentMounted ? (
          <LoaderComponent />
        ) : (
          <Routes>
            <Route path="*" element={<ContentPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/change-password" element={<ForgotPassword />} />
          </Routes>
        )}
      </div>
    </>
  );
}
