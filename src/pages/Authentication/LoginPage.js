import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/login-style.css";
import Logo from "../../components/Header/Logo";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/authenticate/PasswordInput";
import UserService from "../../services/auth/useAuthService";
import MessagePopUp from "../../components/messages/MessagePopUp";
import useUserInformation from "../../hooks/authenticate/useUserInformation";

export default function LoginPage() {
  const navigate = useNavigate();
  const authenticateHook = useUserInformation();
  const [inputFormData, setInputFormData] = useState({
    email: null,
    password: null,
  });
  const [messageInformation, setMessageInformation] = useState();
  const { postLoginUser, setCookie } = UserService();

  useEffect(() => {
    if (authenticateHook.statusAccount.isLoggedIn) {
      navigate("/");
    }
  }, [authenticateHook.statusAccount.isLoggedIn]);

  const updateData = (e, field) => {
    setInputFormData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const signInAction = async () => {
    setMessageInformation();
    const response = await postLoginUser(inputFormData);
    if (response.data !== undefined && response.data.success) {
      authenticateHook.updateStatusAccount({
        ...response.data.userInformation,
        isLoggedIn: true,
      });
      setCookie("authUserToken", response.data?.token, 7);
    } else {
      setMessageInformation({
        msg: response.data ? response.data.msg : response.msg,
        msgType: "error",
      });
    }
  };
  return (
    <div className="white-box-round mid-center">
      <div className="box-comp">
        <Logo />
        <div className="form-comp">
          <input
            className="input-comp"
            placeholder="Email"
            onChange={(e) => updateData(e, "email")}
          />
          <PasswordInput
            placeHolderTitle={"Password"}
            updateData={updateData}
          />
        </div>
        {messageInformation && (
          <MessagePopUp
            messageInformation={messageInformation}
            setMessageInformation={setMessageInformation}
            absolutePosition={false}
          />
        )}
        <div className="txt-center">
          <span className="small-txt">
            Did you forget your password?{" "}
            <Link className="txt-underline" to="/change-password">
              Click Here
            </Link>
          </span>
        </div>
        <div>
          <button
            className="btn-comp full-width txt-uppercase"
            onClick={() => signInAction()}
          >
            Sign In
          </button>
        </div>
        <div className="btn-comp-a">
          <Link
            to="/signup"
            className="btn-comp-outline full-width txt-uppercase"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
