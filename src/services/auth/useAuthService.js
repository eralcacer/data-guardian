import axios from "axios";
import { generateEndpointUrl } from "../../config/Endpoint";
export default function useAuthService() {
  const endpoint = generateEndpointUrl(3000);

  const postLoginUser = async (formData) => {
    if (!formData.email || !formData.password) {
      return { msg: "Please enter your email and password.", msgType: "error" };
    }
    try {
      const responseLogin = await axios.post(endpoint + "/login", {
        email: formData.email,
        password: formData.password,
      });
      return responseLogin;
    } catch (e) {
      return e.response;
    }
  };

  const postAuthenticateUserToken = async () => {
    const authToken = getCookie("authUserToken");
    try {
      let authenticateResponse;
      if (authToken) {
        authenticateResponse = await axios.post(endpoint + "/authenticate", {
          userAuthToken: authToken,
        });
      }
      return authenticateResponse;
    } catch (e) {
      return e.response;
    }
  };

  const postRegisterUser = async (userInformation) => {
    try {
      const registrationResponse = await axios.post(endpoint + "/user", {
        user: userInformation,
      });
      return registrationResponse;
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const putVerifyUser = async (email, verificationCode) => {
    try {
      const verifyUserResponse = await axios.put(endpoint + "/verification", {
        email: email,
        verificationCode: verificationCode,
      });
      return verifyUserResponse;
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const postResetPasswordRequest = async (data) => {
    try {
      const passwordResetResponse = await axios.post(
        endpoint + "/reset-credentials",
        {
          email: data.email,
        }
      );
      return passwordResetResponse;
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getVerifyResetPasswordUrl = async (urlEnd) => {
    try {
      const respVerification = await axios.get(
        endpoint + "/reset-credentials?" + urlEnd
      );

      return respVerification;
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const putUpdateNewPassword = async (urlEnd, password) => {
    try {
      return await axios.put(endpoint + "/reset-credentials?" + urlEnd, {
        password,
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };

  const clearAllCookies = (cookiesName) => {
    document.cookie =
      cookiesName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  };

  const getUserIp = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json'");
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  };

  return {
    postLoginUser,
    postAuthenticateUserToken,
    putVerifyUser,
    postRegisterUser,
    postResetPasswordRequest,
    getVerifyResetPasswordUrl,
    putUpdateNewPassword,
    setCookie,
    getCookie,
    clearAllCookies,
    getUserIp,
  };
}
