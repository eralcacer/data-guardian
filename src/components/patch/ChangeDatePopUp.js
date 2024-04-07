import React, { useState } from "react";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";
import useAccessContentService from "../../services/accesses-patch/useAccessContentService";
import MessagePopUp from "../messages/MessagePopUp";

export default function ChangeDatePopUp({
  setIsOpenPopUp,
  patchInfo,
  currentSite,
}) {
  const { updateActivePatch } = useAccessContentService();
  const [isLoading, setIsLoading] = useState();
  const [newPostingDate, setNewPostingDate] = useState();
  const [messageInformation, setMessageInformation] = useState();

  const handleChageDate = (e) => {
    const currentDate = new Date();
    const newDate = new Date(e.target.value);

    verifyDate(currentDate, newDate);
    setNewPostingDate(newDate);
  };

  const verifyDate = (currentDate, newDate) => {
    if (currentDate > newDate) {
      setMessageInformation({
        msg: "Selected date must be a current date.",
        msgType: "error",
      });
      return false;
    } else {
      setMessageInformation();
      return true;
    }
  };

  const submitNewDate = async () => {
    setIsLoading(true);
    if (currentSite === "access") {
      submitNewDateAccess();
    } else {
      submitNewDateSubs();
    }
  };

  const submitNewDateAccess = async () => {
    const updatePostingDate = await updateActivePatch(newPostingDate);
    if (updatePostingDate.data?.success) {
      setMessageInformation({
        msg: "The dates were posted successfully. Refresh the browser to see the updates.",
        msgType: "success",
      });
      setNewPostingDate([]);
    } else {
      setMessageInformation({
        msg: updatePostingDate.data?.msg,
        msgType: "error",
      });
    }
    setIsLoading(false);
  };

  const submitNewDateSubs = async () => {
    // const updatePostingDate = await updateActivePatchList(newPostingDateList);
    // if (updatePostingDate.data?.success) {
    //   setNewPostingDate([]);
    //   setMessageInformation({
    //     msg: "The dates were posted successfully. Refresh the browser to see the updates.",
    //     msgType: "success",
    //   });
    // } else {
    //   setMessageInformation({
    //     msg: updatePostingDate.data?.msg,
    //     msgType: "error",
    //   });
    // }
  };
  return (
    <>
      <div className="edit-comp"></div>
      <div className="white-box-round content-editor">
        <button
          className="btn-comp-outline close-btn flex-end"
          onClick={() => setIsOpenPopUp((prevState) => !prevState)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
        <div>
          <div>
            <span className="title">
              User:{" "}
              <span className="small-txt">
                {patchInfo.fullName} ({patchInfo.email})
              </span>
            </span>
          </div>
          <div>
            <span className="title">
              Current Selected Posting Date:{" "}
              <span className="small-txt">
                {new Date(patchInfo.postingDate).toLocaleString()}
              </span>
            </span>
          </div>
          <div>
            <span className="title">
              Date Created:{" "}
              <span className="small-txt">
                {new Date(patchInfo.dateCreated).toLocaleString()}
              </span>
            </span>
          </div>
        </div>
        <div>
          <label className="title txt-center">
            New Posting Date to Blockchain
          </label>
          <input
            className="input-comp"
            type="datetime-local"
            placeholder="New Posting Date"
            onChange={(e) => handleChageDate(e)}
          />
        </div>
        {messageInformation && (
          <MessagePopUp
            messageInformation={messageInformation}
            setMessageInformation={setMessageInformation}
            absolutePosition={false}
          />
        )}
        <button
          className="btn-comp txt-uppercase mid-center"
          disabled={isLoading}
          onClick={() => submitNewDate()}
        >
          {isLoading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}
