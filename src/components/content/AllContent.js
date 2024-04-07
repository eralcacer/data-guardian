import React, { useEffect, useState } from "react";

import PostTemplate from "./PostTemplate";
import useSubscriptionsProvider from "../../hooks/subscriptions/useSubscriptionsProvider";
import useSubscriptionService from "../../services/subscribers/useSubscriptionService";

export default function AllContent({ selectedContentArr }) {
  return (
    <>
      {selectedContentArr &&
        selectedContentArr.contentList.map((post) => {
          return (
            <div
              className="white-box-round mid-center content-box"
              key={post._id}
              id={post._id}
            >
              <PostTemplate postInformation={post} />
            </div>
          );
        })}
    </>
  );
}
