import React from "react";
import useContentContext from "../../hooks/content/useContentProvider";
import useTrackerContextProvider from "../../hooks/tracker/useTrackerContextProvider";

export default function MoreContentButton({
  isLoadMoreBtnVisible,
  requestMoreContent,
  isLoading,
}) {
  return (
    <>
      {isLoadMoreBtnVisible ? (
        <div>
          <button
            className="btn-white txt-uppercase mid-center"
            onClick={() => requestMoreContent()}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      ) : null}
    </>
  );
}
