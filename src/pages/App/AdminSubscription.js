import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useUserInformation from "../../hooks/authenticate/useUserInformation";
import LoaderComponent from "../../components/loader/LoaderComponent";
import AdminContent from "../../components/admin-track/AdminContent";
import MoreContentButton from "../../components/content/MoreContentButton";
import useSubscriptionPatchService from "../../services/subscriptions-patch/useSubscriptionPatchService";

export default function AdminSubscription() {
  const navigate = useNavigate();
  const userStatus = useUserInformation();
  const { getActiveSubscribersPatchList } = useSubscriptionPatchService();
  const [activePatches, setActivePatches] = useState([]);
  const [offsetPage, setOffsetPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreBtnVisible, setIsLoadMoreBtnVisible] = useState(true);

  useEffect(() => {
    if (
      !userStatus.statusAccount.userInformation.userType ||
      userStatus.statusAccount.userInformation.userType !== "admin"
    ) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getActivePatches();
  }, []);

  const getActivePatches = async () => {
    setIsLoading(true);
    const activePatchesResp = await getActiveSubscribersPatchList(offsetPage);
    if (activePatchesResp.data?.success) {
      setActivePatches((prevList) => [
        ...prevList,
        ...activePatchesResp.data.activePatchesList,
      ]);
      updateList(activePatchesResp.data.activePatchesList);
      setOffsetPage(
        (prevState) =>
          prevState + activePatchesResp.data.activePatchesList.length
      );
    }
    setIsLoading(false);
  };

  const updateList = (listArr) => {
    if (listArr.length >= 10) {
      setIsLoadMoreBtnVisible(true);
    } else {
      setIsLoadMoreBtnVisible(false);
    }
  };

  const requestMoreContent = async () => {
    await getActivePatches();
  };

  return (
    <>
      {isLoading && <LoaderComponent />}
      <div className="main-content-posts">
        <AdminContent activePatches={activePatches} />
        <MoreContentButton
          isLoadMoreBtnVisible={isLoadMoreBtnVisible}
          requestMoreContent={requestMoreContent}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
