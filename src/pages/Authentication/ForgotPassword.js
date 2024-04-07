import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserService from "../../services/auth/useAuthService";
import Logo from "../../components/Header/Logo";
import MessagePopUp from "../../components/messages/MessagePopUp";
import PasswordInput from "../../components/authenticate/PasswordInput";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    postResetPasswordRequest,
    getVerifyResetPasswordUrl,
    putUpdateNewPassword,
  } = UserService();
  const [data, setData] = useState({ password: null, confirmPassword: null });
  const [messageInformation, setMessageInformation] = useState();
  const [isVerifiedLink, setIsVerifiedLink] = useState();

  useEffect(() => {
    const url = window.location.href.split("?");
    if (url[1]) {
      const urlEnd = url[1];
      verifyResetPasswordLink(urlEnd);
    }
  }, []);
  const updateData = (e, field) => {
    let confirmPassword;
    if (field === "confirm password") {
      confirmPassword = "confirmPassword";
    }
    setData((prevData) => ({
      ...prevData,
      [confirmPassword ? confirmPassword : field]: e.target.value,
    }));
  };

  const sendResetPasswordRequest = async () => {
    if (!data || !data.email) {
      setMessageInformation({
        msg: "You must enter a valid email.",
        msgType: "error",
      });
      return;
    }
    const resetPassworRequest = await postResetPasswordRequest(data);
    if (
      resetPassworRequest.data !== undefined &&
      resetPassworRequest.data.success
    ) {
      setMessageInformation({
        msg: resetPassworRequest.data.msg,
        msgType: "success",
      });
    } else {
      setMessageInformation({
        msg: resetPassworRequest.data
          ? resetPassworRequest.data.msg
          : resetPassworRequest.msg,
        msgType: "error",
      });
    }
  };

  const submitUpdateNewPassword = async () => {
    const urlEnd = window.location.href.split("?")[1];
    if (
      data.password.length < 8 ||
      data.password.length > 16 ||
      !/[A-Z]/.test(data.password) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(data.password)
    ) {
      setMessageInformation({
        msg: "Your password must be between 8 and 16 characters. Including a capital letter and a special character (e.g., !@#$%^&*).",
        msgType: "error",
      });
    } else if (data.confirmPassword !== data.password) {
      setMessageInformation({
        msg: "Your passwords do not match.",
        msgType: "error",
      });
    } else {
      const updatePasswordResp = await putUpdateNewPassword(
        urlEnd,
        data.password
      );
      if (updatePasswordResp && updatePasswordResp.data?.success) {
        setMessageInformation();
        setIsVerifiedLink();
        navigate("/signin");
      } else {
        setMessageInformation({
          msg: updatePasswordResp.msg,
          msgType: "error",
        });
      }
    }
  };

  const verifyResetPasswordLink = async () => {
    try {
      const url = window.location.href.split("?");
      if (url[1]) {
        const urlEnd = url[1];
        const responseVerification = await getVerifyResetPasswordUrl(urlEnd);
        if (responseVerification?.data?.success) {
          setIsVerifiedLink(true);
          setMessageInformation();
        } else {
          setIsVerifiedLink(false);
          setMessageInformation({
            msg: responseVerification?.data?.msg,
            msgType: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching verification:", error);
    }
  };
  return (
    <div className="white-box-round mid-center">
      <div className="box-comp">
        <Logo />
        {isVerifiedLink ? (
          <>
            <div className="form-comp">
              <h2 className="title">Reset Password</h2>
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
                onClick={() => submitUpdateNewPassword()}
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
                className="input-comp"
                placeholder="Email"
                onChange={(e) => updateData(e, "email")}
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
                className="btn-comp full-width txt-uppercase"
                onClick={() => sendResetPasswordRequest()}
              >
                Submit
              </button>
            </div>
            <div className="btn-comp-a">
              <Link
                to="/signin"
                className="btn-comp-outline full-width txt-uppercase"
              >
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
