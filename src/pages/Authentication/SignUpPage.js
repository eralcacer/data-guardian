import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./styles/login-style.css";
import Logo from "../../components/Header/Logo";
import PasswordInput from "../../components/authenticate/PasswordInput";
import useUserInformation from "../../hooks/authenticate/useUserInformation";
import useAuthService from "../../services/auth/useAuthService";
import MessagePopUp from "../../components/messages/MessagePopUp";

export default function SignUpPage() {
  const userInformation = useUserInformation();
  const navigate = useNavigate();
  const [userDataInformation, setUserDataInformation] = useState({
    verificationCode: "",
  });
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [messageInformation, setMessageInformation] = useState();
  const { postRegisterUser, putVerifyUser, setCookie } = useAuthService();
  useEffect(() => {
    if (userInformation.statusAccount.isLoggedIn) {
      navigate("/");
    }
  }, [userInformation.statusAccount.isLoggedIn]);

  const updateData = (e, field) => {
    let confirmPassword;
    if (field === "confirm password") {
      confirmPassword = "confirmPassword";
    }
    setUserDataInformation((prevData) => ({
      ...prevData,
      [confirmPassword ? confirmPassword : field]: e.target.value,
    }));
  };
  const registerUser = async () => {
    if (
      !userDataInformation.first_name ||
      !userDataInformation.last_name ||
      !userDataInformation.email ||
      !userDataInformation.password ||
      !userDataInformation.confirmPassword
    ) {
      setMessageInformation({
        msg: "You must fill up all the inputs.",
        msgType: "error",
      });
    } else if (
      userDataInformation.password.length < 8 ||
      userDataInformation.password.length > 16 ||
      !/[A-Z]/.test(userDataInformation.password) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
        userDataInformation.password
      )
    ) {
      setMessageInformation({
        msg: "Your password must be between 8 and 16 characters. Including a capital letter and a special character (e.g., !@#$%^&*).",
        msgType: "error",
      });
    } else if (
      userDataInformation.confirmPassword !== userDataInformation.password
    ) {
      setMessageInformation({
        msg: "Your passwords do not match.",
        msgType: "error",
      });
    } else {
      const registrationResponse = await postRegisterUser(userDataInformation);
      if (registrationResponse.data?.success) {
        setIsVerificationVisible(true);
        setMessageInformation({
          msg: registrationResponse.data.msg,
          msgType: "info",
        });
      } else {
        setMessageInformation({
          msg: registrationResponse.userDataInformation?.msg,
          msgType: "error",
        });
      }
    }
  };

  const checkVerificationCode = async () => {
    const verificationResponse = await putVerifyUser(
      userDataInformation.email,
      userDataInformation.verificationCode
    );
    if (verificationResponse.data?.success) {
      setCookie("authUserToken", verificationResponse.data.jwtToken, 7);
      setMessageInformation();
      const statusAuth = {
        userInformation: verificationResponse.data.userInformation,
        isLoggedIn: true,
      };
      userInformation.updateStatusAccount(statusAuth);
      navigate("/");
      setIsVerificationVisible(false);
    } else {
      setMessageInformation({
        msg: verificationResponse.data?.msg,
        msgType: "error",
      });
    }
  };
  return (
    <div className="white-box-round mid-center">
      <div className="box-comp">
        <Logo />
        {isVerificationVisible ? (
          <>
            <div className="form-comp">
              <input
                className="input-comp"
                placeholder="Verification Code"
                type="text"
                onChange={(e) => updateData(e, "verificationCode")}
                value={userDataInformation.verificationCode}
              />
            </div>
            <div className="txt-center">
              <span className="small-txt">
                <span className="txt-underline" onClick={() => registerUser()}>
                  Resend Code
                </span>
              </span>
            </div>
            {messageInformation && (
              <MessagePopUp
                messageInformation={messageInformation}
                setMessageInformation={setMessageInformation}
                absolutePosition={false}
              />
            )}
            <div>
              <button
                onClick={() => checkVerificationCode()}
                className="btn-comp full-width txt-uppercase"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="form-comp">
              <input
                className="input-comp txt-capitalize"
                placeholder="First Name"
                type="text"
                onChange={(e) => updateData(e, "first_name")}
              />
              <input
                className="input-comp txt-capitalize"
                placeholder="Last Name"
                type="text"
                onChange={(e) => updateData(e, "last_name")}
              />
              <input
                className="input-comp"
                placeholder="Email"
                type="text"
                onChange={(e) => updateData(e, "email")}
              />
              <PasswordInput
                placeHolderTitle={"Password"}
                updateData={updateData}
              />
              <PasswordInput
                placeHolderTitle={"Confirm Password"}
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
            <div>
              <button
                onClick={() => registerUser()}
                className="btn-comp full-width txt-uppercase"
              >
                Sign Up
              </button>
            </div>
            <div className="btn-comp-a">
              <Link
                to="/signin"
                className="btn-comp-outline full-width txt-uppercase"
              >
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
