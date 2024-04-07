import React, { useEffect, useState } from "react";

export default function DisplayFile({ fileInformation }) {
  const [fileDataUrl, setFileDataUrl] = useState("");

  useEffect(() => {
    renderFile();
  }, []);

  const renderFile = () => {
    setFileDataUrl({
      uri: `data:${fileInformation.mimeType};base64,${fileInformation.dataFile}`,
    });
  };

  return (
    <iframe
      className="pdf-content"
      src={`${fileDataUrl.uri}#toolbar=0`}
      style={{ width: "100%", height: "600px" }}
      type={fileInformation?.mimeType}
    ></iframe>
  );
}
