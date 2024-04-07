import React, { useEffect, useState } from "react";
import axios from "axios";

import { generateEndpointUrl } from "../../config/Endpoint";
import useAuthService from "../auth/useAuthService";

export default function useContentService() {
  const endpoint = generateEndpointUrl(3008);
  const { getCookie } = useAuthService();
  const [authUserToken, setAuthUserToken] = useState();

  useEffect(() => {
    // if (token) {
    //   setAuthUserToken(token);
    // }
  }, [getCookie]);

  const getContentList = async (skipPage) => {
    try {
      const token = getCookie("authUserToken");

      return await axios.get(endpoint + "/content", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { skipPage },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getContentListSubscribed = async (skipPage, subscriptionsList) => {
    try {
      const token = getCookie("authUserToken");
      return await axios.get(endpoint + "/subscribed-content", {
        headers: { Authorization: `Bearer ${token}` },
        params: { skipPage, subscriptionsList },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getContentById = async () => {
    try {
      const token = getCookie("authUserToken");

      return await axios.get(endpoint + "/post", {
        headers: {
          Authorization: `Bearer ${
            authUserToken ? authUserToken : getCookie("authUserToken")
          }`,
        },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getFullContentById = async (postId, viewerIp, subscriberToken) => {
    try {
      return await axios.get(endpoint + "/file", {
        headers: { Authorization: `Bearer ${subscriberToken}` },
        params: { viewerIp, postId },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const postNewContent = async (selectedFile, contentData) => {
    const authUserToken = getCookie("authUserToken");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const config = {
        headers: {
          Authorization: `Bearer ${authUserToken}`,
        },
      };
      // Append the content data to the FormData object
      formData.append("title", contentData.title);
      formData.append("content", contentData.content);

      const response = await axios.post(
        endpoint + "/content",
        formData,
        config
      );

      return response;
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getRefreshContentList = async (lastPostIdDate) => {
    try {
      const authUserToken = getCookie("authUserToken");
      return await axios.get(endpoint + "/content-refresh", {
        headers: {
          Authorization: `Bearer ${authUserToken}`,
        },
        params: { lastPostIdDate },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getRefreshContentListSubscribed = async (
    lastPostIdDate,
    subscriptionsList
  ) => {
    try {
      const authUserToken = getCookie("authUserToken");
      return await axios.get(endpoint + "/subscribed-content-refresh", {
        headers: {
          Authorization: `Bearer ${authUserToken}`,
        },
        params: { lastPostIdDate, subscriptionsList },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getMyContentList = async (skipPage) => {
    try {
      const authUserToken = getCookie("authUserToken");
      return await axios.get(endpoint + "/my-content", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: { skipPage },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const deleteMyContent = async (postId) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.delete(endpoint + "/my-content", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: { postId: postId },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getContentListByTitle = async (querySearch) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/search-content", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: {
          querySearch,
        },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  return {
    getContentList,
    getContentListSubscribed,
    getContentById,
    getFullContentById,
    postNewContent,
    getRefreshContentList,
    getRefreshContentListSubscribed,
    getMyContentList,
    deleteMyContent,
    getContentListByTitle,
  };
}
