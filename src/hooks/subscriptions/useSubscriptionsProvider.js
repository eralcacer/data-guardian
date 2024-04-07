import React, { useContext } from "react";

import { SubscriptionsContext } from "./SubscriptionsContext";

export default function useSubscriptionsProvider() {
  const subscriptionsHook = useContext(SubscriptionsContext);
  if (!subscriptionsHook) {
    throw new Error(
      "useSubscriptionsProvider must be used within SubscriptionsContextProvider"
    );
  }
  return subscriptionsHook;
}
