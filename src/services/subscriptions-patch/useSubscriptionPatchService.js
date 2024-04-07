import React from "react";
import axios from "axios";

import { generateEndpointUrl } from "../../config/Endpoint";
import useAuthService from "../auth/useAuthService";

export default function useSubscriptionPatchService() {
  const endpoint = generateEndpointUrl(3004);
  const { getCookie } = useAuthService();

  const getIsSubscriberPatchActive = async () => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/subscribers-patch", {
        headers: { Authorization: `Bearer ${authUserToken}` },
      });
    } catch (e) {
      return e.response;
    }
  };

  const postNewSubscribersPatch = async () => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.post(endpoint + "/new-subscribers-patch", {
        authUserToken: authUserToken,
      });
    } catch (e) {
      return e.response;
    }
  };

  const getListSubscribersPatchesDateStatus = async (skipPage) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/patches", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: { skipPage: skipPage },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getListSubscribersPosted = async (patchId, skipPage) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/subscribers", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: { patchId, skipPage },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };
  const getActiveSubscribersPatchList = async (skipPage) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/active-patches", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: { skipPage },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };
  const updateActiveSubsPatchList = async (newPostingDateList) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.put(endpoint + "/active-patches", {
        authUserToken: authUserToken,
        updatePatchesList: newPostingDateList,
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };
  return {
    getIsSubscriberPatchActive,
    postNewSubscribersPatch,
    getListSubscribersPatchesDateStatus,
    getListSubscribersPosted,
    getActiveSubscribersPatchList,
    updateActiveSubsPatchList,
  };
}
