import { useState } from "react";
import { UserContext } from "./UserContext.js";

export const UserContextProvider = ({ children }) => {
  const [statusAccount, setStatusAccount] = useState({
    userInformation: null,
    isLoggedIn: false,
  });

  const updateStatusAccount = (data) => {
    setStatusAccount((prevStatusAccount) => ({
      userInformation: { ...data },
      isLoggedIn: data.isLoggedIn,
    }));
  };

  return (
    <UserContext.Provider value={{ statusAccount, updateStatusAccount }}>
      {children}
    </UserContext.Provider>
  );
};
