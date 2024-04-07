import React from "react";

export default function SubmitButtonDates({ submitNewDate, isLoading }) {
  return (
    <button
      className="btn-comp-green save-btn txt-uppercase"
      disabled={isLoading}
      onClick={() => submitNewDate()}
    >
      {isLoading ? "Loading..." : "Save Posting Dates"}
    </button>
  );
}
