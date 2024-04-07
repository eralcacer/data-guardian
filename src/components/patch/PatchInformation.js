import React, { useState } from "react";

import "./styles/patch-style.css";
import EditButton from "./EditButton";
import ChangeDatePopUp from "./ChangeDatePopUp";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";

export default function PatchInformation({
  patchInfo,
  setNewPostingDateList,
  currentSite,
}) {
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const messageInformationGlobal = useMessageInformation();

  const handleChageDate = (e) => {
    const currentDate = new Date();
    const newDate = new Date(e.target.value);
    const isDateValid = verifyDate(currentDate, newDate);
    if (isDateValid) {
      const newPostingDate = {
        newPostingDate: newDate.toISOString(),
        patchId: patchInfo._id,
      };
      setNewPostingDateList((prevList) => [...prevList, newPostingDate]);
    }
  };

  const verifyDate = (currentDate, newDate) => {
    if (currentDate > newDate) {
      messageInformationGlobal.updateMessageInformation(
        "Selected date must be a current date.",
        "error"
      );
      return false;
    } else {
      messageInformationGlobal.updateMessageInformation();
      return true;
    }
  };

  return (
    <>
      {isOpenPopUp && (
        <ChangeDatePopUp
          setIsOpenPopUp={setIsOpenPopUp}
          patchInfo={patchInfo}
          currentSite={currentSite}
        />
      )}

      <div className="white-box-round mid-center">
        <div>
          {patchInfo.fullName && (
            <span className="title flex-start">
              <span>
                Owner: {patchInfo.fullName}
                <span className="small-txt"> ({patchInfo.email})</span>
              </span>
            </span>
          )}
        </div>
        <div>
          <span className="title flex-start">
            Date Created:{" "}
            <span className="small-txt">
              {new Date(patchInfo.dateCreated).toLocaleString()}
            </span>
          </span>
        </div>
        <div>
          <span className="title flex-start">
            Posting Date:{" "}
            <span className="small-txt">
              {new Date(patchInfo.postingDate).toLocaleString()}
            </span>
          </span>
        </div>
        {currentSite === "access" && (
          <div>
            <span className="title flex-start">
              Number of Viewers:{" "}
              <span className="small-txt">{patchInfo.numberViewers}</span>
            </span>
          </div>
        )}
        <div>
          <label className="title">
            Select a New Posting Date For Blockchain
          </label>
          <input
            className="input-comp"
            type="datetime-local"
            onChange={(e) => handleChageDate(e)}
          />
        </div>
        {/* <EditButton isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp} /> */}
      </div>
    </>
  );
}
