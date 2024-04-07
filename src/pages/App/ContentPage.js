import React from "react";
import { Routes, Route } from "react-router-dom";

import AccessTrack from "./AccessTrack";
import SubscriberTrack from "./SubscriberTrack";
import AdminAccess from "./AdminAccess";
import AdminSubscription from "./AdminSubscription";
import ManagePosts from "./ManagePosts";
import MainContent from "../../components/content/MainContent";
import ContentProvider from "../../hooks/content/ContentProvider";
import SubscriptionsContextProvider from "../../hooks/subscriptions/SubscriptionsContextProvider";
import MyProfilePage from "./MyProfilePage";
import StartTrackingButton from "../../components/tracking/StartTrackingButton";
import MessagePopUp from "../../components/messages/MessagePopUp";
import useMessageInformation from "../../hooks/message-information/useMessageInformation";
import TrackerProvider from "../../hooks/tracker/TrackerProvider";

export default function ContentPage() {
  const messageInformationGlobal = useMessageInformation();

  return (
    <>
      <ContentProvider>
        <SubscriptionsContextProvider>
          <TrackerProvider>
            {messageInformationGlobal.messageInformation && <MessagePopUp />}
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/my-content" element={<ManagePosts />} />
              <Route path="/profile" element={<MyProfilePage />} />
              <Route path="/access-track" element={<AccessTrack />} />
              <Route path="/subscribers-track" element={<SubscriberTrack />} />
              <Route path="/admin-access" element={<AdminAccess />} />
              <Route
                path="/admin-subscription"
                element={<AdminSubscription />}
              />
            </Routes>
            <StartTrackingButton />
          </TrackerProvider>
        </SubscriptionsContextProvider>
      </ContentProvider>
    </>
  );
}
