import React, { useEffect, useState } from "react";

import "./styles/grid-style.css";
import useAccessContentService from "../../services/accesses-patch/useAccessContentService";
import useTrackerContextProvider from "../../hooks/tracker/useTrackerContextProvider";
import useContentContext from "../../hooks/content/useContentProvider";

export default function GridDisplayInformation({ trackerList, currentSite }) {
  console.log(trackerList);
  return (
    <table className="grid-comp">
      <tbody>
        <tr>
          {currentSite === "access" && (
            <>
              <th>Post ID</th>
              <th>Post Title</th>
            </>
          )}
          <th>{currentSite === "access" ? "Viewer" : "Subscriber"} ID</th>
          <th>{currentSite === "access" ? "Viewer" : "Subscriber"} Name</th>
          <th>{currentSite === "access" ? "Viewer" : "Subscriber"} Email</th>
          <th>Subscribers Token</th>
          <th>{currentSite === "access" ? "Viewer" : "Subscriber"} IP</th>
          <th>
            {currentSite === "access" ? "View" : "Subscribed"} Date & Time
          </th>
          {currentSite === "subscriptions" && <th>Expiration Date & Time</th>}
        </tr>
        {trackerList.length > 0 &&
          trackerList.map((tracker) => {
            const trackerInformation =
              currentSite === "access" ? tracker.viewers : tracker.subscribers;
            return (
              <tr key={trackerInformation._id}>
                {currentSite === "access" ? (
                  <>
                    <td>{trackerInformation.postId}</td>
                    <td>
                      {trackerInformation.postTitle
                        ? trackerInformation.postTitle
                        : "Undefined Title"}
                    </td>
                    <td>{trackerInformation.viewerId}</td>

                    <td>{trackerInformation.fullName}</td>
                    <td>{trackerInformation.viewerEmail}</td>
                    <td className="viewer-token">
                      {trackerInformation.viewerToken}
                    </td>
                    <td>{trackerInformation.viewerIp}</td>
                    <td>
                      {new Date(trackerInformation.viewDate).toLocaleString()}
                    </td>
                  </>
                ) : (
                  <>
                    <td>{trackerInformation.subscriberId}</td>
                    <td>{trackerInformation.fullName}</td>
                    <td>{trackerInformation.subscriberToken}</td>
                    <td>{trackerInformation.subscriberEmail}</td>
                    <td>{trackerInformation.subscriberIp}</td>
                    <td>
                      {new Date(
                        trackerInformation.subscriptionDate
                      ).toLocaleString()}
                    </td>
                    <td>
                      {new Date(
                        trackerInformation.expirationDate
                      ).toLocaleString()}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
