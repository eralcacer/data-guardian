import React, { useState, useEffect } from "react";

import "./styles/tracking-styles.css";
import useAccessContentService from "../../services/accesses-patch/useAccessContentService";
import useSubscriptionPatchService from "../../services/subscriptions-patch/useSubscriptionPatchService";
import TrackingPopUp from "./TrackingPopUp";

export default function StartTrackingButton() {
  const { getIsAccessPatchActive } = useAccessContentService();
  const { getIsSubscriberPatchActive } = useSubscriptionPatchService();
  const [selectedTrackings, setSelectedTrackings] = useState({
    accessesPatchActive: null,
    subscribersPatchActive: null,
  });
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  useEffect(() => {
    checkSelectedTrackingBoxes();
  }, []);

  const checkSelectedTrackingBoxes = async () => {
    const accessPatchActive = await getIsAccessPatchActive();
    if (
      accessPatchActive.data?.success &&
      accessPatchActive.data?.accessPatchInformation
    ) {
      setSelectedTrackings((prevState) => ({
        ...prevState,
        accessesPatchActive: true,
      }));
    }
    const subscriberPatchActive = await getIsSubscriberPatchActive();
    if (
      subscriberPatchActive.data?.success &&
      subscriberPatchActive.data?.patchInformation
    ) {
      setSelectedTrackings((prevState) => ({
        ...prevState,
        subscribersPatchActive: true,
      }));
    }
  };
  return (
    <>
      {isPopUpOpen && (
        <TrackingPopUp
          setIsPopUpOpen={setIsPopUpOpen}
          selectedTrackings={selectedTrackings}
          setSelectedTrackings={setSelectedTrackings}
        />
      )}
      <button
        className="btn-track txt-uppercase"
        onClick={() => setIsPopUpOpen((prevState) => !prevState)}
      >
        Start Tracking 🔐
      </button>
    </>
  );
}
