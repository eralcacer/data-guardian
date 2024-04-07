import React from "react";
import useContentContext from "../../hooks/content/useContentProvider";
import useContentService from "../../services/content/useContentService";
import useSubscriptionsProvider from "../../hooks/subscriptions/useSubscriptionsProvider";

export default function RefreshContentButton({
  isAllContentListVisible,
  isLoading,
}) {
  const contentInformation = useContentContext();
  const subscribersInformation = useSubscriptionsProvider();
  const { getRefreshContentList, getRefreshContentListSubscribed } =
    useContentService();

  const refreshContent = async () => {
    let newPostsContent, type;
    if (isAllContentListVisible) {
      newPostsContent = await getRefreshContentList(
        contentInformation.allContent.contentList[0].date
      );
      type = "allContent";
    } else if (!isAllContentListVisible) {
      newPostsContent = await getRefreshContentListSubscribed(
        contentInformation.subscribersContent.contentList[0].date,
        subscribersInformation.subscriptionsPosterIdArr
      );
      type = "subscriptionContent";
    }
    contentInformation.insertFrontNewContent(
      newPostsContent.data.listPosts,
      type
    );
  };

  return (
    <div>
      <button
        className="btn-white txt-uppercase mid-center"
        onClick={() => refreshContent()}
        disabled={isLoading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-arrow-clockwise"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
        </svg>
      </button>
    </div>
  );
}
