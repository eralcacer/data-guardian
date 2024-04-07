import React, { useEffect, useState } from "react";
import useSubscriptionsProvider from "../../hooks/subscriptions/useSubscriptionsProvider";
import useContentService from "../../services/content/useContentService";
import useSubscriptionService from "../../services/subscribers/useSubscriptionService";
import useUserInformation from "../../hooks/authenticate/useUserInformation";
import useAuthService from "../../services/auth/useAuthService";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";
import DisplayFile from "./DisplayFile";
import useContentContext from "../../hooks/content/useContentProvider";

export default function PostTemplate({ postInformation }) {
  const subscriptionsInformationMap = useSubscriptionsProvider();
  const userStatusAccount = useUserInformation();
  const messageInformationGlobal = useMessageInformation();
  const contentInformationProvider = useContentContext();
  const { getFullContentById } = useContentService();
  const { postNewSubscription } = useSubscriptionService();
  const { getUserIp } = useAuthService();
  const [isUnlockButtonVisible, setIsUnlockButtonVisible] = useState(false);
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);
  const [contentInformation, setContentInformation] = useState();
  const [fileInformation, setFileInformation] = useState();

  const getPostContent = async (subscriptionToken) => {
    if (subscriptionToken) {
      const viewerIp = await getUserIp();
      const getContentResponse = await getFullContentById(
        postInformation._id.toString(),
        viewerIp,
        subscriptionToken
      );
      if (getContentResponse.data?.success) {
        setIsButtonsVisible(false);
        setIsUnlockButtonVisible(false);
        setContentInformation(getContentResponse.data.contentInformation);
        setFileInformation(getContentResponse.data?.fileContent);
        messageInformationGlobal.updateMessageInformation();
      } else {
        messageInformationGlobal.updateMessageInformation(
          getContentResponse.data?.msg,
          "error"
        );
      }
    }
  };

  const subscribeContent = async () => {
    const viewerIp = await getUserIp();
    const subscribeContentResp = await postNewSubscription(
      postInformation.posterId,
      viewerIp,
      userStatusAccount.statusAccount.userInformation.id
    );
    if (subscribeContentResp.data?.success) {
      subscriptionsInformationMap.setSubscriptionToken(
        postInformation.posterId,
        subscribeContentResp.data.subscriptionToken
      );
      await getPostContent(subscribeContentResp.data?.subscriptionToken);
    }
  };

  const checkSubscriptionAction = async () => {
    const subscriptionInformation =
      subscriptionsInformationMap.subscriptionsMap[postInformation.posterId];
    if (subscriptionInformation) {
      await getPostContent(subscriptionInformation?.subscriptionToken);
    } else {
      setIsUnlockButtonVisible((prevState) => !prevState);
    }
  };

  return (
    <>
      <div className="post-title-top">
        {postInformation.posterFullName && (
          <span className="title">
            {postInformation.posterFullName}{" "}
            <span className="small-txt">({postInformation.posterEmail})</span>
          </span>
        )}
        <span className="small-txt flex-end">
          {new Date(postInformation.date).toLocaleString()}
        </span>
      </div>
      <div className="post-comp">
        <div className="group-content">
          <div className="group-txt">
            <div>
              <p className="title">
                Title: <span className="txt-desc">{postInformation.title}</span>
              </p>
              {contentInformation && contentInformation.content && (
                <p className="title">
                  Content:
                  <span className="txt-desc">{contentInformation.content}</span>
                </p>
              )}
            </div>
          </div>
          {isUnlockButtonVisible && (
            <>
              <div className="unlock-txt">
                <h4 className="txt-center">
                  By clicking the Unlock button you will able to view all the
                  content from {postInformation.posterFullName} and all your
                  accesses to the content will be tracked.
                </h4>
              </div>
              <div className="txt-red txt-center">
                Are you sure you want to unlock {postInformation.posterFullName}
                's content?
              </div>
            </>
          )}
        </div>
        <div className="group-btn">
          {isButtonsVisible &&
            (!isUnlockButtonVisible ? (
              <>
                <button
                  className="btn-comp txt-uppercase"
                  onClick={() => {
                    checkSubscriptionAction();
                  }}
                >
                  View More
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-comp txt-uppercase"
                  onClick={() => subscribeContent()}
                >
                  Unlock Content
                </button>
                <button
                  className="btn-comp-outline txt-uppercase"
                  onClick={() =>
                    setIsUnlockButtonVisible((prevState) => !prevState)
                  }
                >
                  Cancel
                </button>
              </>
            ))}
        </div>
      </div>
      {fileInformation && fileInformation.dataFile && (
        <DisplayFile fileInformation={fileInformation} />
      )}
    </>
  );
}
