import React from "react";
import SearchBar from "./SearchBar";
import PostTemplate from "../content/PostTemplate";
import useContentContext from "../../hooks/content/useContentProvider";

export default function MainSearch({ isLoading, setIsLoading }) {
  const contentInformation = useContentContext();
  console.log(contentInformation.searchContentList);
  return (
    <>
      <SearchBar isLoading={isLoading} setIsLoading={setIsLoading} />
      <div className="search-results">
        {contentInformation.searchContentList && (
          <>
            <h2 className="txt-center">Search Query</h2>

            {contentInformation.searchContentList.map((post) => {
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
        )}
      </div>
    </>
  );
}
