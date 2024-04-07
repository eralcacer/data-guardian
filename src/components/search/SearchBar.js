import React, { useState } from "react";
import useContentService from "../../services/content/useContentService";
import useContentContext from "../../hooks/content/useContentProvider";
import MessagePopUp from "../messages/MessagePopUp";

export default function SearchBar({ isLoading, setIsLoading }) {
  const { getContentListByTitle } = useContentService();
  const contentInformation = useContentContext();
  const [queryTitle, setQueryTitle] = useState();
  const [messageInformation, setMessageInformation] = useState();

  const handleChangeInput = (e) => {
    let capitalizedValue = e.target.value;
    capitalizedValue =
      capitalizedValue.charAt(0).toUpperCase() + capitalizedValue.slice(1);
    e.target.value = capitalizedValue;
    setQueryTitle(e.target.value);
  };

  const submitSearchQuery = async () => {
    setIsLoading(true);
    if (!queryTitle || queryTitle?.trim("") === "") {
      setMessageInformation({
        msg: "Type something in the query to search.",
        msgType: "warn",
      });
      setIsLoading(false);
      return;
    }
    const getContentListByTitleResp = await getContentListByTitle(queryTitle);
    if (getContentListByTitleResp.data?.success) {
      if (getContentListByTitleResp.data.contentList.length > 0) {
        contentInformation.updateSearchContent(
          getContentListByTitleResp.data.contentList
        );
        setMessageInformation();
      } else if (getContentListByTitleResp.data?.contentList.length === 0) {
        setMessageInformation({ msg: "No content found.", msgType: "info" });
        contentInformation.updateSearchContent();
      }
    } else {
      contentInformation.updateSearchContent();
      setMessageInformation({
        msg: getContentListByTitleResp?.data?.msg,
        msgType: "error",
      });
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="white-box-round mid-center content-box">
        <input
          className="input-comp capitalize-input"
          type="text"
          placeholder="Search by title"
          onChange={(e) => handleChangeInput(e)}
        />
        <MessagePopUp
          messageInformation={messageInformation}
          setMessageInformation={setMessageInformation}
          absolutePosition={false}
        />
        <button
          className="btn-comp-outline txt-uppercase mid-center"
          disabled={isLoading}
          onClick={() => submitSearchQuery()}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </div>
    </>
  );
}
