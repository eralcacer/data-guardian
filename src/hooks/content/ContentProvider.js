import React, { useState } from "react";
import { ContentContext } from "./ContentContext";

export default function ContentProvider({ children }) {
  const [allContent, setAllContent] = useState({
    contentList: [],
    skipPage: 0,
  });
  const [showMoreAllContent, setShowMoreAllContent] = useState(true);
  const [subscribersContent, setSubscribersContent] = useState({
    contentList: [],
    skipPage: 0,
  });
  const [showMoreSubContent, setShowMoreSubContent] = useState(true);
  const [myContentList, setMyContentList] = useState({
    contentList: [],
    skipPage: 0,
  });
  const [showMoreMyContent, setShowMoreMyContent] = useState();
  const [searchContentList, setSearchContentList] = useState();

  const insertContent = (listContent, type) => {
    if (type === "allContent") {
      setAllContent((prevState) => ({
        contentList: [...prevState.contentList, ...listContent],
        skipPage: prevState.skipPage + listContent.length,
      }));
    } else if (type === "subscriptionContent") {
      setSubscribersContent((prevState) => ({
        contentList: [...prevState.contentList, ...listContent],
        skipPage: prevState.skipPage + listContent.length,
      }));
    }
  };

  const insertFrontNewContent = (listContent, type) => {
    if (type === "allContent") {
      setAllContent((prevState) => ({
        contentList: [...listContent, ...prevState.contentList],
        skipPage: prevState.skipPage + listContent.length,
      }));
    } else if (type === "subscriptionContent") {
      setSubscribersContent((prevState) => ({
        contentList: [...listContent, ...prevState.contentList],
        skipPage: prevState.skipPage + listContent.length,
      }));
    }
  };

  const setMoreAllContent = (isMoreContent) => {
    setShowMoreAllContent(isMoreContent);
  };

  const setMoreSubContent = (isMoreSubContent) => {
    setShowMoreSubContent(isMoreSubContent);
  };

  const setIsMoreMyContent = (isMoreMyContent) => {
    setShowMoreMyContent(isMoreMyContent);
  };

  const updateMyContentList = (listContent) => {
    if (listContent?.length > 0) {
      setMyContentList((prevState) => ({
        contentList: [...listContent, ...prevState.contentList],
        skipPage: prevState.skipPage + listContent.length,
      }));
    }
  };

  const removePost = (postId) => {
    const updatedContentList = myContentList.contentList.filter(
      (post) => post._id !== postId
    );

    // Update the state with the new content list
    setMyContentList((prev) => ({
      ...prev,
      contentList: updatedContentList,
    }));
  };

  const updateSearchContent = (contentList) => {
    setSearchContentList(contentList);
  };

  return (
    <ContentContext.Provider
      value={{
        allContent,
        subscribersContent,
        showMoreSubContent,
        showMoreAllContent,
        myContentList,
        searchContentList,
        insertContent,
        insertFrontNewContent,
        setMoreAllContent,
        setMoreSubContent,
        updateMyContentList,
        setIsMoreMyContent,
        removePost,
        updateSearchContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}
