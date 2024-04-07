import React from "react";
import PostTemplate from "./PostTemplate";

export default function SubscriberPopUp({
  isUnlockPopUpVisible,
  setIsUnlockPopUpVisible,
}) {
  return (
    <div className="white-box-round pop-up-subs appear">
      <div className="flex-end">
        <button
          className="btn-comp-outline"
          onClick={() => setIsUnlockPopUpVisible()}
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
      </div>
      <div className="unlock-txt">
        <h4 className="txt-center">
          By clicking the Unlock button you will able to view all the content
          from {isUnlockPopUpVisible.posterFullName} and all your accesses to
          the content will be tacked.
        </h4>
      </div>
      <div className="txt-red txt-center">
        Are you sure you want to unlock {isUnlockPopUpVisible.posterFullName}
        's content?
      </div>
      <PostTemplate
        postInformation={isUnlockPopUpVisible}
        isUnlockPopUpVisible={isUnlockPopUpVisible}
        setIsUnlockPopUpVisible={setIsUnlockPopUpVisible}
      />
    </div>
  );
}
