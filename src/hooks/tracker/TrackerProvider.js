import React, { useState } from "react";

import { TrackerContext } from "./TrackerContext";

export default function TrackerProvider({ children }) {
  const [accessesList, setAccessesList] = useState({
    accessesList: [],
    offsetPage: 0,
  });
  const [isMoreAccessesVisible, setIsMoreAccessesVisible] = useState(true);
  const [subscriptionsPatchList, setSubscriptionsPatchList] = useState({
    subscriptionsList: [],
    offsetPage: 0,
  });
  const [isMoreSubscriptionsVisible, setIsMoreSubscriptionsVisible] =
    useState(true);
  const [selectedItem, setSelectedItem] = useState();

  const updatePatchList = (list, type) => {
    if (type === "access") {
      setAccessesList((prevState) => ({
        accessesList: [...prevState.accessesList, ...list],
        offsetPage: prevState.offsetPage + list.length,
      }));
      setIsMoreAccessesVisible(list.length === 10);
    } else if (type === "subscriptions") {
      setSubscriptionsPatchList((prevState) => ({
        subscriptionsList: [...prevState.subscriptionsList, ...list],
        offsetPage: prevState.offsetPage + list.length,
      }));
      setIsMoreSubscriptionsVisible(list.length === 10);
    }
  };

  const updateSelectedItem = (infoItem) => {
    setSelectedItem(infoItem);
  };

  const resetPatchList = (list, type) => {
    if (type === "access") {
      setAccessesList({
        accessesList: [...list],
        offsetPage: list.length,
      });
      setIsMoreAccessesVisible(list.length >= 10 ? true : false);
    } else if (type === "subscriptions") {
      setSubscriptionsPatchList({
        subscriptionsList: [...list],
        offsetPage: list.length,
      });
      setIsMoreSubscriptionsVisible(list.length >= 10 ? true : false);
    }
  };

  const setVisibilityBtn = (listLength) => {
    return listLength >= 10;
  };

  return (
    <TrackerContext.Provider
      value={{
        accessesList,
        subscriptionsPatchList,
        selectedItem,
        isMoreAccessesVisible,
        isMoreSubscriptionsVisible,
        updateSelectedItem,
        updatePatchList,
        resetPatchList,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
