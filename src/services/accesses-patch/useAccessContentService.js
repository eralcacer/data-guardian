import React from "react";
import axios from "axios";

import { generateEndpointUrl } from "../../config/Endpoint";
import useAuthService from "../auth/useAuthService";

export default function useAccessContentService() {
  const endpoint = generateEndpointUrl(3003);
  const { getCookie } = useAuthService();

  const getIsAccessPatchActive = async () => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/access-patch", {
        headers: { Authorization: `Bearer ${authUserToken}` },
      });
    } catch (e) {
      return e.response;
    }
  };

  const postNewAccessPatch = async () => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.post(endpoint + "/access-patch", {
        authUserToken: authUserToken,
      });
    } catch (e) {
      return e.response;
    }
  };

  const getListAccessesPatchesDateStatus = async (skipPage) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/list-access-patch", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: { skipPage: skipPage },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getViewersList = async (patchId, offsetPage) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/viewer", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: { patchId, offsetPage },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getActiveAccessesPatchesList = async (offsetPage) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/access-patch-all", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: { offsetPage },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const updateActiveAccessPatchList = async (patchId, newDate) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.put(endpoint + "/update-date-access", {
        authUserToken: authUserToken,
        patchId: patchId,
        newPostingDate: newDate.toISOString(),
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const updateActivePatchList = async (newPostingDateList) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.put(endpoint + "/posting-date-access", {
        authUserToken: authUserToken,
        updateAccessPatchesList: newPostingDateList,
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };
  return {
    getIsAccessPatchActive,
    postNewAccessPatch,
    getListAccessesPatchesDateStatus,
    getViewersList,
    getActiveAccessesPatchesList,
    updateActiveAccessPatchList,
    updateActivePatchList,
  };
}
