import React, { useState } from "react";

import useUserInformation from "../../hooks/authenticate/useUserInformation";
import useAuthService from "../../services/auth/useAuthService";
import DisplayFile from "../content/DisplayFile";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";
import useContentService from "../../services/content/useContentService";
import useContentContext from "../../hooks/content/useContentProvider";

export default function MyPostTemplate({ postInformation }) {
  const userInformation = useUserInformation();
  const messageInformationGlobal = useMessageInformation();
  const contentInformationProvider = useContentContext();
  const { getFullContentById, getUserIp } = useAuthService();
  const { deleteMyContent } = useContentService();
  const [contentInformation, setContentInformation] = useState();
  const [fileInformation, setFileInformation] = useState();
  const [isContentButtonVisible, setIsContentButtonVisible] = useState(true);

  const getPostContent = async (subscriptionToken) => {
    if (subscriptionToken) {
      const viewerIp = await getUserIp();
      const getContentResponse = await getFullContentById(
        postInformation._id.toString(),
        viewerIp,
        subscriptionToken
      );
      if (getContentResponse.data?.success) {
        setIsContentButtonVisible(false);
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

  const deleteMyPost = async () => {
    const deletePostResp = await deleteMyContent(postInformation._id);
    if (deletePostResp?.data.success) {
      contentInformationProvider.removePost(postInformation._id);
      messageInformationGlobal.updateMessageInformation(
        deletePostResp.data.msg,
        "success"
      );
    }
  };

  return (
    <>
      <div className="post-title-top">
        <span className="title">
          {userInformation.statusAccount.userInformation.firstName}{" "}
          {userInformation.statusAccount.userInformation.lastName}
          <span className="small-txt">
            ({userInformation.statusAccount.userInformation.email})
          </span>
        </span>
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
        </div>
        <div className="group-btn">
          {isContentButtonVisible && (
            <button
              className="btn-comp txt-uppercase"
              onClick={() => {
                getPostContent();
              }}
            >
              View More
            </button>
          )}
          <button
            className="red-btn-outline txt-uppercase"
            onClick={() => deleteMyPost()}
          >
            Delete
          </button>
        </div>
      </div>
      {fileInformation && fileInformation.dataFile && (
        <DisplayFile fileInformation={fileInformation} />
      )}
    </>
  );
}
