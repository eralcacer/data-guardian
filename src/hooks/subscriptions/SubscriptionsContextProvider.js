import React, { useState } from "react";

import { SubscriptionsContext } from "./SubscriptionsContext";

export default function SubscriptionsContextProvider({ children }) {
  const [subscriptionsMap, setSubscriptionsMaps] = useState(new Map());
  const [subscriptionsPosterIdArr, setSubscriptionsPosterIdArr] = useState([]);

  const setSubscriptionToken = (posterId, subscriptionToken) => {
    setSubscriptionsMaps((prevState) => ({
      ...prevState,
      [posterId]: {
        subscriptionToken: subscriptionToken,
      },
    }));
  };

  const setSubscriptionList = (posterId) => {
    setSubscriptionsPosterIdArr((prevState) => [...prevState, posterId]);
  };

  return (
    <SubscriptionsContext.Provider
      value={{
        subscriptionsMap,
        subscriptionsPosterIdArr,
        setSubscriptionList,
        setSubscriptionToken,
      }}
    >
      {children}
    </SubscriptionsContext.Provider>
  );
}
