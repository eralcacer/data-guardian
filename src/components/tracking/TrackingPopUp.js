import React, { useState } from "react";
import useAccessContentService from "../../services/accesses-patch/useAccessContentService";
import useSubscriptionPatchService from "../../services/subscriptions-patch/useSubscriptionPatchService";
import LoaderComponent from "../loader/LoaderComponent";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";

export default function TrackingPopUp({
  setIsPopUpOpen,
  selectedTrackings,
  setSelectedTrackings,
}) {
  const messageInformationGlobal = useMessageInformation();
  const { postNewAccessPatch } = useAccessContentService();
  const { postNewSubscribersPatch } = useSubscriptionPatchService();
  const [messageInformation, setMessageInformation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const startTrackingAll = async () => {
    setIsLoading(true);
    //Call post patch access
    if (!selectedTrackings.accessesPatchActive) {
      const createAccessPatchResp = await postNewAccessPatch();
      if (createAccessPatchResp.data?.success) {
        setSelectedTrackings((prevState) => ({
          ...prevState,
          accessesPatchActive: true,
        }));
      } else {
        messageInformationGlobal.updateMessageInformation(
          createAccessPatchResp.data.msg,
          "error"
        );
      }
    }
    //Call post patch subscribers
    if (!selectedTrackings.subscribersPatchActive) {
      const createSubscribersPatchResp = await postNewSubscribersPatch();
      if (createSubscribersPatchResp.data?.success) {
        setSelectedTrackings((prevState) => ({
          ...prevState,
          subscribersPatchActive: true,
        }));
      } else {
        messageInformationGlobal.updateMessageInformation(
          createSubscribersPatchResp.data?.msg,
          "error"
        );
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="mid-fixed appear white-box-round track-menu-option appear">
        <div className="group-pop-up">
          <div className="close-btn">
            <button
              className="btn-comp-outline"
              onClick={() => setIsPopUpOpen((prevState) => !prevState)}
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
          <div>
            <span className="title">
              Track every access to the data in your content:{" "}
            </span>
            <br />
            <span className="small-txt">
              (Users only see your content's title and name if not subscribed)
            </span>
            <br />
            <span className="status-txt">
              Status:
              <span className="small-txt">
                {selectedTrackings.accessesPatchActive
                  ? " Tracking Active ✅"
                  : " No Tracking Active ❌"}
              </span>
            </span>
          </div>
          <div>
            <span className="title">Track all your subscribers: </span>
            <br />
            <span className="small-txt">
              (You can see who recently subscribed to your access your content.)
            </span>
            <br />
            <span className="status-txt">
              Status:
              <span className="small-txt">
                {selectedTrackings.subscribersPatchActive
                  ? " Tracking Active ✅"
                  : " No Tracking Active ❌"}
              </span>
            </span>
          </div>
        </div>
        <div>
          {selectedTrackings.accessesPatchActive &&
          selectedTrackings.subscribersPatchActive ? (
            <h4 className="title txt-center">You are all set! 🎉</h4>
          ) : (
            <button
              className="btn-comp mid-center txt-uppercase"
              disabled={isLoading}
              onClick={() => startTrackingAll()}
            >
              {isLoading ? "Loading..." : "Track All"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
