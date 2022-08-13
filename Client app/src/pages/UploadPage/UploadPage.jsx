import React, { useState, useEffect } from "react";
import DownloadBox from "../../components/DownloadBox/DownloadBox";
import UploadBox from "../../components/UploadBox/UploadBox";
import "./UploadPage.css";

export const UploadPage = () => {
  return (
    <div className="uploadWrapper">
      <UploadBox />
    </div>
  );
};

export default UploadPage;
