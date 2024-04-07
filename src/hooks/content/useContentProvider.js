import React, { useContext } from "react";

import { ContentContext } from "./ContentContext";

export default function useContentContext() {
  const contentInformation = useContext(ContentContext);
  if (!contentInformation) {
    throw new Error("useContentContext should be used withing ContentProvider");
  }
  return contentInformation;
}
