import React from "react";

import MyPostTemplate from "./MyPostTemplate";

export default function AllMyContent({ selectedContentArr }) {
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
              <MyPostTemplate postInformation={post} />
            </div>
          );
        })}
    </>
  );
}
