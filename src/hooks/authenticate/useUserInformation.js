import { useContext } from "react";
import { UserContext } from "./UserContext.js";
export default function useUserInformation() {
  const userInformation = useContext(UserContext);

  if (!userInformation) {
    throw new Error(
      "userUserInformation must be used within a UserInformationContextProvider"
    );
  }

  return userInformation;
}
