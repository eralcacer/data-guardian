import React from "react";
import axios from "axios";
import { generateEndpointUrl } from "../../config/Endpoint";
import useAuthService from "../auth/useAuthService";

export default function useSubscriptionService() {
  const endpoint = generateEndpointUrl(3001);
  const { getCookie } = useAuthService();

  const getSubscriptiontoken = async (posterId) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/subscription-token", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: { posterId },
      });
    } catch (e) {
      return e.response;
    }
  };

  const getSusbcriptionsTokenList = async () => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/active-subscriptions", {
        headers: { Authorization: `Bearer ${authUserToken}` },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const postNewSubscription = async (posterId, subscriberIp, subscriberId) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.post(endpoint + "/insert-subscriber", {
        authUserToken: authUserToken,
        subscriberId: subscriberId,
        subscriberIp: subscriberIp,
        posterId: posterId,
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  const getActiveSubscribersList = async (skipPage) => {
    const authUserToken = getCookie("authUserToken");
    try {
      return await axios.get(endpoint + "/subscriptions", {
        headers: { Authorization: `Bearer ${authUserToken}` },
        params: { skipPage },
      });
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };
  return {
    getSubscriptiontoken,
    getSusbcriptionsTokenList,
    postNewSubscription,
    getActiveSubscribersList,
  };
}
