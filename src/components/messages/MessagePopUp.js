import React from "react";

import "./styles/messages-style.css";
import MessageIcons from "./MessageIcons";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";

export default function MessagePopUp({
  messageInformation,
  setMessageInformation,
  absolutePosition,
}) {
  const messageInformationGlobal = useMessageInformation();

  const resetMessageInformation = () => {
    if (messageInformation) {
      setMessageInformation();
    } else if (messageInformationGlobal.messageInformation) {
      messageInformationGlobal.updateMessageInformation();
    }
  };
  return (
    <>
      {messageInformation || messageInformationGlobal.messageInformation ? (
        <div
          className={`message-box ${
            messageInformation
              ? messageInformation.msgType
              : messageInformationGlobal.messageInformation.msgType
          }-comp ${
            absolutePosition || messageInformationGlobal.messageInformation
              ? "msg-absolute-position"
              : ""
          } `}
        >
          <MessageIcons
            msgType={
              messageInformation
                ? messageInformation.msgType
                : messageInformationGlobal.messageInformation.msgType
            }
          />
          <div
            className={`${
              messageInformation
                ? messageInformation.msgType
                : messageInformationGlobal.messageInformation.msgType
            }-txt txt-uppercase-first-letter`}
          >
            {messageInformation
              ? messageInformation.msg
              : messageInformationGlobal.messageInformation.msg}
          </div>
          <div
            className={`cross-${
              messageInformation
                ? messageInformation.msgType
                : messageInformationGlobal.messageInformation.msgType
            }-icon`}
            onClick={() => resetMessageInformation()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>
        </div>
      ) : null}
    </>
  );
}
