import React, { useContext } from "react";
import { MessageInformationContext } from "./MessageInformationContext";

export default function useMessageInformation() {
  const messageInformationGlobal = useContext(MessageInformationContext);

  if (!messageInformationGlobal) {
    throw new Error(
      "useMessageInformation must be used within MessageInformationProvider"
    );
  }

  return messageInformationGlobal;
}
