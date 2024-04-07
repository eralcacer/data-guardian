import React, { useState } from "react";
import useContentService from "../../services/content/useContentService";
import MessagePopUp from "../messages/MessagePopUp";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";

export default function PostCreator({ setIsPostOpen }) {
  const { postNewContent } = useContentService();
  const messageInformationGlobal = useMessageInformation();
  const [postContentData, setPostContentData] = useState({
    title: null,
    content: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [messageInformation, setMessageInformation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const updateContent = (e, field) => {
    setPostContentData((prevContentData) => ({
      ...prevContentData,
      [field]: e.target.value,
    }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmitPost = async () => {
    setIsLoading(true);
    if (!postContentData.title) {
      setMessageInformation({
        msg: "Title field is required.",
        msgType: "error",
      });
      setIsLoading(false);
      return;
    }
    const postNewContentResp = await postNewContent(
      selectedFile,
      postContentData
    );
    if (postNewContentResp.data?.success) {
      setPostContentData();
      setSelectedFile(null);
      setIsPostOpen(false);
      setMessageInformation();
      messageInformationGlobal.updateMessageInformation(
        postNewContentResp.data.msg,
        "success"
      );
    } else {
      setMessageInformation({
        msg: postNewContentResp.data?.msg,
        msgType: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="content-creation-comp"></div>
      <div className="white-box-round content-form">
        <div
          className="btn-comp-outline close-post"
          onClick={() => setIsPostOpen((prevState) => !prevState)}
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
        </div>
        <h2 className="title txt-center">Create a New Post ☕️</h2>
        <div className="post-form full-width">
          <input
            className="input-comp"
            type="text"
            placeholder="Your title. (Not subscribed users can see this content)"
            onChange={(e) => updateContent(e, "title")}
          />
          <textarea
            className="input-comp input-content"
            rows="5"
            placeholder="Write your content (Optional. Only for subscribers)"
            onChange={(e) => updateContent(e, "content")}
          />
          <div>
            <div>
              <label htmlFor="fileInput">Select File: </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => handleFileChange(e)}
                accept=".jpg,.jpeg,.png,.gif,.pdf" // Specify accepted file types
              />
            </div>
          </div>
          {messageInformation && (
            <MessagePopUp
              messageInformation={messageInformation}
              setMessageInformation={setMessageInformation}
              absolutePosition={false}
            />
          )}
          <div className="mid-center">
            <button
              className="btn-comp txt-uppercase"
              onClick={() => handleSubmitPost()}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit Post"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
