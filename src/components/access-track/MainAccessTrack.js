import React, { useState, useEffect } from "react";

import DropdownMenu from "../dropdown/DropdownMenu";
import useAccessContentService from "../../services/accesses-patch/useAccessContentService";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";
import GridDisplayInformation from "../tracking-information/GridDisplayInformation";
import useTrackerContextProvider from "../../hooks/tracker/useTrackerContextProvider";
import LoaderComponent from "../loader/LoaderComponent";
import MoreContentButton from "../content/MoreContentButton";
import useSubscriptionPatchService from "../../services/subscriptions-patch/useSubscriptionPatchService";
import useSubscriptionService from "../../services/subscribers/useSubscriptionService";

export default function MainAccessTrack() {
  const { getListAccessesPatchesDateStatus, getViewersList } =
    useAccessContentService();
  const { getListSubscribersPatchesDateStatus, getListSubscribersPosted } =
    useSubscriptionPatchService();
  const { getActiveSubscribersList } = useSubscriptionService();
  const messageInformationGlobal = useMessageInformation();
  const trackerProvider = useTrackerContextProvider();
  const [listTrackerPatches, setListTrackerPatches] = useState([]);
  const [skipPage, setSkipPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const [currentSite, setCurrentSite] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);
  const [isLoadMoreBtnVisible, setIsLoadMoreBtnVisible] = useState(true);

  useEffect(() => {
    setCurrentSite(getTrackerType());
  }, []);

  useEffect(() => {
    if (currentSite && currentSite === "access") {
      getListPatchAccess();
    } else if (currentSite && currentSite === "subscriptions") {
      getListPatchSubscribers();
    }
  }, [currentSite]);

  useEffect(() => {
    if (selectedItem && currentSite === "access") {
      setIsLoading(true);
      getViewersInfo();
    } else if (selectedItem && currentSite === "subscriptions") {
      setIsLoading(true);
      getSubscribersInfo();
    }
    setRenderComponent(true);
  }, []);

  useEffect(() => {
    // debugger;
    // const linkType = window.location.href.split("/");
    if (
      renderComponent &&
      selectedItem &&
      currentSite === "access"
      // linkType[linkType.length - 1].split("-")[0] === "access"
    ) {
      setIsLoading(true);
      updateViewersInfo();
    } else if (
      renderComponent &&
      selectedItem &&
      currentSite === "subscriptions"
      // linkType[linkType.length - 1].split("-")[0] === "subscribers"
    ) {
      setIsLoading(true);
      updateSubscribersInfo();
    }
  }, [selectedItem]);

  const getListPatchAccess = async () => {
    const getListResp = await getListAccessesPatchesDateStatus(skipPage);
    setSkipPage((prevState) => prevState + getListResp?.data?.listArr?.length);
    if (getListResp.data?.success) {
      setListTrackerPatches(getListResp.data.listArr);
      messageInformationGlobal.updateMessageInformation();
    } else {
      messageInformationGlobal.updateMessageInformation(
        getListResp?.data?.msg,
        "error"
      );
    }
  };

  const getListPatchSubscribers = async () => {
    const getListResp = await getListSubscribersPatchesDateStatus(skipPage);
    setSkipPage((prevState) => prevState + getListResp?.data?.listArr?.length);
    if (getListResp?.data?.success) {
      setListTrackerPatches(getListResp.data.listArr);
      messageInformationGlobal.updateMessageInformation();
    } else {
      messageInformationGlobal.updateMessageInformation(
        getListResp?.data?.msg,
        "error"
      );
    }
  };

  const requestMoreContent = async () => {
    setIsLoading(true);
    if (currentSite === "access") {
      await getViewersInfo();
    } else if (!currentSite === "subscriptions") {
      await getSubscribersInfo();
    }
    setIsLoading(false);
  };

  const getTrackerType = () => {
    const linkType = window.location.href.split("/");
    if (linkType[linkType.length - 1].split("-")[0] === "access") {
      return "access";
    } else if (linkType[linkType.length - 1].split("-")[0] === "subscribers") {
      return "subscriptions";
    }
  };

  const getViewersInfo = async () => {
    const viewersListResp = await getViewersList(
      selectedItem._id,
      trackerProvider.accessesList.offsetPage
    );
    if (viewersListResp.data?.success) {
      trackerProvider.updatePatchList(
        viewersListResp.data.viewersList,
        currentSite
      );
    }
    setIsLoading(isLoading);
  };

  const updateViewersInfo = async () => {
    const viewersListResp = await getViewersList(selectedItem._id, 0);
    if (viewersListResp.data?.success) {
      trackerProvider.resetPatchList(
        viewersListResp.data.viewersList,
        currentSite
      );
    }
    setIsLoading(false);
  };

  const updateSubscribersInfo = async () => {
    if (selectedItem.transactionHash) {
      const subscribersListResp = await getListSubscribersPosted(
        selectedItem._id,
        0
      );
      if (subscribersListResp.data?.success) {
        trackerProvider.resetPatchList(
          subscribersListResp.data.subscribersList,
          currentSite
        );
      }
    } else if (!selectedItem.transactionHash) {
      const subscribersListResp = await getActiveSubscribersList(0);
      if (subscribersListResp.data?.success) {
        trackerProvider.resetPatchList(
          subscribersListResp.data.subscriptionsList,
          currentSite
        );
      }
    }
    setIsLoading(false);
  };

  const getSubscribersInfo = async () => {
    if (selectedItem.transactionHash) {
      const subscriptionsListResp = await getListSubscribersPosted(
        selectedItem._id,
        trackerProvider.subscriptionsPatchList.offsetPage
      );
      if (subscriptionsListResp.data?.success) {
        trackerProvider.updatePatchList(
          subscriptionsListResp.data.subscribersList,
          currentSite
        );
      }
    } else if (!selectedItem.transactionHash) {
      console.log("EHAHRHA");
      const subscriptionsListResp = await getActiveSubscribersList(
        trackerProvider.subscriptionsPatchList.offsetPage
      );
      console.log(subscriptionsListResp);
      if (subscriptionsListResp.data?.success) {
        trackerProvider.updatePatchList(
          subscriptionsListResp.data.subscribersList,
          currentSite
        );
      }
    }
    setIsLoading(false);
  };
  console.log(trackerProvider);
  return (
    <>
      <div className="main-content-posts">
        <h3 className="txt-center txt-capitalize">
          Tracking Your {currentSite} Data
        </h3>
        <div>
          <DropdownMenu
            listTrackerPatches={listTrackerPatches}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
        </div>
        <div>
          {isLoading && !renderComponent ? (
            <LoaderComponent />
          ) : (
            <GridDisplayInformation
              trackerList={
                currentSite === "access"
                  ? trackerProvider.accessesList.accessesList
                  : trackerProvider.subscriptionsPatchList.subscriptionsList
              }
              currentSite={currentSite}
            />
          )}
        </div>
        <MoreContentButton
          isLoadMoreBtnVisible={
            currentSite === "access"
              ? trackerProvider.isMoreAccessesVisible
              : trackerProvider.isMoreSubscriptionsVisible
          }
          requestMoreContent={requestMoreContent}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
