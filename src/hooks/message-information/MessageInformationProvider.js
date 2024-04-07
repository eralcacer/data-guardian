import React, { useState } from "react";
import { MessageInformationContext } from "./MessageInformationContext";

export default function MessageInformationProvider({ children }) {
  const [messageInformation, setMessageInformation] = useState();

  const updateMessageInformation = (msg, msgType) => {
    if (!msg && !msgType) {
      setMessageInformation();
    } else {
      setMessageInformation({
        msg: msg,
        msgType: msgType,
      });
    }
  };

  return (
    <MessageInformationContext.Provider
      value={{ messageInformation, updateMessageInformation }}
    >
      {children}
    </MessageInformationContext.Provider>
  );
}
