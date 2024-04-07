import React, { useContext } from "react";

import { TrackerContext } from "./TrackerContext";

export default function useTrackerContextProvider() {
  const useAccessTracker = useContext(TrackerContext);
  if (!useAccessTracker) {
    throw new Error(
      "useTrackerContextProvider must be used within TrackerProvider"
    );
  }

  return useAccessTracker;
}
