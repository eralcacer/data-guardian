import React, { useEffect, useState } from "react";

import "./styles/content-style.css";
import useContentService from "../../services/content/useContentService";
import AllContent from "./AllContent";
import useContentContext from "../../hooks/content/useContentProvider";
import LoaderComponent from "../loader/LoaderComponent";
import SubscriberPopUp from "./SubscriberPopUp";
import CreateContent from "./CreateContent";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";
import useSubscriptionsProvider from "../../hooks/subscriptions/useSubscriptionsProvider";
import useSubscriptionService from "../../services/subscribers/useSubscriptionService";
import MoreContentButton from "./MoreContentButton";
import RefreshContentButton from "./RefreshContentButton";
import MainSearch from "../search/MainSearch";

export default function MainContent() {
  const { getContentList, getContentListSubscribed } = useContentService();
  const contentInformation = useContentContext();
  const messageInformationGlobal = useMessageInformation();
  const subscribersInformation = useSubscriptionsProvider();
  const { getSusbcriptionsTokenList } = useSubscriptionService();
  const [isAllContentListVisible, setIsAllContentListVisible] = useState(true);
  const [isSusbcribersContentVisible, setIsSubscribersContentVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlockPopUpVisible, setIsUnlockPopUpVisible] = useState();
  const [loadMoreBtn, setLoadMoreBtn] = useState(true);

  useEffect(() => {
    checkSubscriptions();
  }, []);
  useEffect(() => {
    if (
      isAllContentListVisible &&
      contentInformation.allContent.skipPage === 0
    ) {
      getPostsListAll();
    } else if (
      isSusbcribersContentVisible &&
      contentInformation.subscribersContent.skipPage === 0 &&
      subscribersInformation.subscriptionsPosterIdArr.length > 0
    ) {
      getPostsListSubscribers();
    }
  }, [isAllContentListVisible, isSusbcribersContentVisible]);

  const getPostsListAll = async () => {
    setIsLoading(true);
    const postListResponse = await getContentList(
      contentInformation.allContent.skipPage
    );
    if (postListResponse && postListResponse.data?.success) {
      const typeOfContent = isAllContentListVisible
        ? "allContent"
        : "subscriptionContent";
      messageInformationGlobal.updateMessageInformation();
      contentInformation.insertContent(
        postListResponse.data.listPosts,
        typeOfContent
      );
      const isMoreContent = postListResponse.data.listPosts.length === 10;
      contentInformation.setMoreAllContent(isMoreContent);
      //   setSkipPage((prevPage) => prevPage + 1);
    } else {
      messageInformationGlobal.updateMessageInformation(
        postListResponse.data?.msg,
        "error"
      );
    }
    setIsLoading(false);
  };

  const getPostsListSubscribers = async () => {
    setIsLoading(true);
    const postListResponse = await getContentListSubscribed(
      contentInformation.subscribersContent.skipPage,
      subscribersInformation.subscriptionsPosterIdArr
    );
    if (postListResponse.data && postListResponse.data?.success) {
      const typeOfContent = isAllContentListVisible
        ? "allContent"
        : "subscriptionContent";
      messageInformationGlobal.updateMessageInformation();
      contentInformation.insertContent(
        postListResponse.data.listPosts,
        typeOfContent
      );
      const isMoreContent = postListResponse.data.listPosts.length === 10;
      contentInformation.setMoreSubContent(isMoreContent);
      //   setSkipPage((prevPage) => prevPage + 1);
    } else {
      messageInformationGlobal.updateMessageInformation(
        postListResponse.data?.msg,
        "error"
      );
    }
    setIsLoading(false);
  };

  const checkSubscriptions = async () => {
    setIsLoading(true);
    const subscriberTokenResp = await getSusbcriptionsTokenList();
    for (const post in subscriberTokenResp.data?.subscriptionsList) {
      subscribersInformation.setSubscriptionToken(
        subscriberTokenResp.data.subscriptionsList[post].subscribers.posterId,
        subscriberTokenResp.data.subscriptionsList[post].subscribers
          .subscriberToken
      );
      subscribersInformation.setSubscriptionList(
        subscriberTokenResp.data.subscriptionsList[post].subscribers.posterId
      );
    }
    setIsLoading(false);
  };

  const setAllContentVisbile = () => {
    if (isSusbcribersContentVisible) {
      setIsAllContentListVisible(true);
      setIsSubscribersContentVisible(false);
    }
  };

  const setSubContentVisible = () => {
    if (isAllContentListVisible) {
      setIsAllContentListVisible(false);
      setIsSubscribersContentVisible(true);
    }
  };

  const requestMoreContent = async () => {
    if (isAllContentListVisible) {
      await getPostsListAll();
    } else if (!isAllContentListVisible) {
      await getPostsListSubscribers();
    }
  };

  const updateMoreBtnVisibility = () => {
    if (isAllContentListVisible) {
      setLoadMoreBtn(contentInformation.showMoreAllContent);
    } else if (isSusbcribersContentVisible) {
      setLoadMoreBtn(contentInformation.showMoreSubContent);
    }
  };

  return (
    <>
      {isUnlockPopUpVisible && (
        <SubscriberPopUp
          isUnlockPopUpVisible={isUnlockPopUpVisible}
          setIsUnlockPopUpVisible={setIsUnlockPopUpVisible}
        />
      )}
      <CreateContent />
      <div
        className={`main-content-posts ${
          isUnlockPopUpVisible ? "opacity" : ""
        }`}
      >
        <div className="menu-posts">
          <div>
            <button
              className="title txt-center"
              style={{ color: "#f5f5f5" }}
              onClick={() => {
                setAllContentVisbile();
              }}
            >
              For You
            </button>
            <div className={isAllContentListVisible ? "active" : ""}></div>
          </div>{" "}
          |{" "}
          <div>
            <button
              className="title txt-center"
              style={{ color: "#f5f5f5" }}
              onClick={() => {
                setSubContentVisible();
              }}
            >
              My Subscriptions
            </button>
            <div className={!isAllContentListVisible ? "active" : ""}></div>
          </div>
        </div>
        <MainSearch isLoading={isLoading} setIsLoading={setIsLoading} />
        {isLoading ? <LoaderComponent /> : null}
        <RefreshContentButton
          isAllContentListVisible={isAllContentListVisible}
          isLoading={isLoading}
        />
        <AllContent
          selectedContentArr={
            isAllContentListVisible
              ? contentInformation.allContent
              : contentInformation.subscribersContent
          }
          setIsLoading={loadMoreBtn}
          isUnlockPopUpVisible={isUnlockPopUpVisible}
          setIsUnlockPopUpVisible={setIsUnlockPopUpVisible}
        />
        <MoreContentButton
          isLoadMoreBtnVisible={
            isAllContentListVisible
              ? contentInformation.showMoreAllContent
              : contentInformation.showMoreSubContent
          }
          requestMoreContent={requestMoreContent}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
