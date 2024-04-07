import React from "react";
import ChangeDatePopUp from "./ChangeDatePopUp";

export default function EditButton({ isOpenPopUp, setIsOpenPopUp }) {
  const handleOpenPopUp = () => {
    const bodyComp = document.querySelector("body");
    if (isOpenPopUp) {
      //   bodyComp.style.opacity = 1;
      bodyComp.style.overflowY = "scroll";
    } else {
      //   bodyComp.style.opacity = 0.7;
      bodyComp.style.overflowY = "none";
    }

    setIsOpenPopUp((prevState) => !prevState);
  };
  return (
    <button
      onClick={() => handleOpenPopUp()}
      className="btn-comp txt-center txt-uppercase mid-center"
    >
      Edit Posting Date
    </button>
  );
}
