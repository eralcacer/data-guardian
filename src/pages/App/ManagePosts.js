import React, { useEffect, useState } from "react";
import useUserInformation from "../../hooks/authenticate/useUserInformation";
import LoaderComponent from "../../components/loader/LoaderComponent";
import useContentService from "../../services/content/useContentService";
import useContentContext from "../../hooks/content/useContentProvider";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";
import AllMyContent from "../../components/manage-content/AllMyContent";

export default function ManagePosts() {
  const contentInformationProvider = useContentContext();
  const messageInformationGlobal = useMessageInformation();
  const { getMyContentList } = useContentService();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    renderMyPosts();
  }, []);
  const renderMyPosts = async () => {
    const getMyContentResp = await getMyContentList(
      contentInformationProvider.myContentList.skipPage
    );
    if (getMyContentResp.data?.success) {
      messageInformationGlobal.updateMessageInformation();
      contentInformationProvider.updateMyContentList(
        getMyContentResp.data.listPosts
      );
      contentInformationProvider.setIsMoreMyContent(
        getMyContentResp.data.listPosts?.length === 10
      );
    } else {
      messageInformationGlobal.updateMessageInformation(
        getMyContentResp.data?.msg,
        "error"
      );
    }
  };

  return (
    <>
      {isLoading && <LoaderComponent />}
      <div className="main-content-posts">
        <h2 className="txt-center">My Content</h2>
        <AllMyContent
          selectedContentArr={contentInformationProvider.myContentList}
        />
      </div>
    </>
  );
}
