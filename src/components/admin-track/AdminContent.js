import React, { useEffect, useState } from "react";

import PatchInformation from "../patch/PatchInformation";
import useAccessContentService from "../../services/accesses-patch/useAccessContentService";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";
import SubmitButtonDates from "./SubmitButtonDates";
import useSubscriptionPatchService from "../../services/subscriptions-patch/useSubscriptionPatchService";

export default function AdminContent(activePatches) {
  const { updateActiveAccessPatchList } = useAccessContentService();
  const { updateActiveSubsPatchList } = useSubscriptionPatchService();
  const messageInformationGlobal = useMessageInformation();
  const [newPostingDateList, setNewPostingDateList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [currentSite, setCurrentSite] = useState();

  useEffect(() => {
    if (!currentSite) {
      const linkType = window.location.href.split("/");
      let site;
      if (linkType[linkType.length - 1].split("-")[1] === "access") {
        site = "access";
      } else {
        site = "subscribers";
      }
      setCurrentSite(site);
    }
  }, []);

  const submitNewDate = async () => {
    setIsLoading(true);
    if (currentSite === "access") {
      submitNewDateAccess();
    } else {
      submitNewDateSubs();
    }
  };

  const submitNewDateAccess = async () => {
    const updatePostingDate = await updateActiveAccessPatchList(
      newPostingDateList
    );
    if (updatePostingDate.data?.success) {
      messageInformationGlobal.updateMessageInformation(
        "The dates were posted successfully. Refresh the browser to see the updates.",
        "success"
      );
      setNewPostingDateList([]);
    } else {
      messageInformationGlobal.updateMessageInformation(
        updatePostingDate.data?.msg,
        "error"
      );
    }
    setIsLoading(false);
  };

  const submitNewDateSubs = async () => {
    const updatePostingDate = await updateActiveSubsPatchList(
      newPostingDateList
    );
    if (updatePostingDate.data?.success) {
      setNewPostingDateList([]);
      messageInformationGlobal.updateMessageInformation(
        "The dates were posted successfully. Refresh the browser to see the updates.",
        "success"
      );
    } else {
      messageInformationGlobal.updateMessageInformation(
        updatePostingDate.data?.msg,
        "error"
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      {newPostingDateList?.length > 0 && (
        <SubmitButtonDates
          submitNewDate={submitNewDate}
          isLoading={isLoading}
        />
      )}
      {activePatches &&
        activePatches.activePatches.map((activePatch) => {
          return (
            <div className="white-box-round mid-center" key={activePatch._id}>
              <PatchInformation
                patchInfo={activePatch}
                setNewPostingDateList={setNewPostingDateList}
                currentSite={currentSite}
              />
            </div>
          );
        })}
    </>
  );
}
