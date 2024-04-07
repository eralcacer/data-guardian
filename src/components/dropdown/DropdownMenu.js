import React, { useEffect, useState } from "react";

import "./styles/dropdown-style.css";
import useBlockchainService from "../../services/blockchain/useBlockchainService";
export default function DropdownMenu({
  listTrackerPatches,
  setSelectedItem,
  selectedItem,
}) {
  const { verifyPatchBlock } = useBlockchainService();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (listTrackerPatches?.length > 0 && !selectedItem) {
      setSelectedItemRender();
      verifyPatches();
    }
  }, [listTrackerPatches]);

  const setSelectedItemRender = async () => {
    let verificationPatchResp = false;
    if (listTrackerPatches[0] && listTrackerPatches[0].transactionHash) {
      verificationPatchResp = isPatchVerified(
        listTrackerPatches[0].transactionHash
      ).data.success;
    }
    setSelectedItem({
      ...listTrackerPatches[0],
      isPatchVerified: verificationPatchResp,
    });
  };

  const openCloseDropdownMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const getSelectedElementInfo = async () => {
    // CAll access patch service to get the current patch info
  };

  const verifyPatches = async () => {
    for (const patch of listTrackerPatches) {
      let verificationPatchResp;
      if (patch.transactionHash) {
        verificationPatchResp = await isPatchVerified(patch.transactionHash);
        patch.transaction = verificationPatchResp.data.transaction;
      }
      patch.isPatchVerified = verificationPatchResp
        ? verificationPatchResp.data?.success
        : false;
    }
  };

  const isPatchVerified = async (transactionHash) => {
    // Call service in blockchain with transaction hash id to check if verified
    return await verifyPatchBlock(transactionHash);
  };

  const updateSelectedItem = (patchInfo) => {
    if (patchInfo._id !== selectedItem._id) {
      const prevSelected = document.querySelector(".selected");
      if (prevSelected) {
        prevSelected.classList.remove("selected");
      }

      const newSelected = document.getElementById(patchInfo._id);
      if (newSelected) {
        newSelected.classList.add("selected");
      }
      setSelectedItem(patchInfo);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {selectedItem && (
        <div className="drop-menu">
          <div
            className="main-menu-item"
            onClick={() => {
              openCloseDropdownMenu();
            }}
          >
            <span>
              {selectedItem &&
                new Date(selectedItem.dateCreated).toLocaleString()}
            </span>
            <span>
              <span>
                {selectedItem && selectedItem.isPatchVerified
                  ? " Verified ✅"
                  : " Not Verified❌"}
              </span>
            </span>
          </div>
          <div
            className={`menu-elements ${isMenuOpen ? "drop-down" : "drop-up"}`}
          >
            {listTrackerPatches &&
              listTrackerPatches.map((patchInfo) => {
                const datePostedLocal = new Date(
                  patchInfo.dateCreated
                ).toLocaleString();
                return (
                  <div
                    className={`element-menu ${
                      patchInfo._id === selectedItem._id ? "selected" : ""
                    }`}
                    id={patchInfo._id}
                    key={patchInfo._id}
                    onClick={() => updateSelectedItem(patchInfo)}
                  >
                    <div>
                      <span>{datePostedLocal} </span>
                      <span>
                        {patchInfo.isPatchVerified
                          ? "Verified ✅"
                          : "Not Verified❌"}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
