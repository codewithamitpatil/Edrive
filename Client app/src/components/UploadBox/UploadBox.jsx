import React, { useState } from "react";
import "./UploadBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UploadBox = () => {
  const [fileObj, setFileObj] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [smsg, setSmsg] = useState("");
  const [emsg, setEmsg] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const uploadHandler = (event) => {
    setSmsg("");
    setEmsg("");
    const file = event.target.files[0];
    if (!file) return;
    setFileObj(file);
  };

  const uploadFile = async (file) => {
    try {
      setSmsg("");
      setEmsg("");
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const data = await axiosPrivate.post("/api/storage/upload", formData);
      setTimeout(() => {
        setIsLoading(false);
        setSmsg("File Uploaded Success Fully");
        setFileObj("");
      }, 4000);
    } catch (error) {
      setIsLoading(false);
      setFileObj("");
      setSmsg("");

      console.error(error);

      if (error.response) {
        // The request was made and the server responded with a status code
        setEmsg(error.response.data.message);
      } else if (error.request) {
        setEmsg("Plz try letter");
      } else {
        setEmsg("Internal Error");
      }
    }
  };

  const cancelUpload = () => {
    setFileObj("");
  };

  return (
    <>
      <div className="file-card">
        <br />
        {fileObj && <h3>{fileObj.name}</h3>}

        {emsg && <h3 className="text-danger">{emsg}</h3>}
        {smsg && <h3 className="text-success"> {smsg}</h3>}
        {isLoading && (
          <>
            <br />
            <RotatingLines
              width="60"
              strokeWidth="4"
              strokeColor="black"
              animationDuration="3"
            />
          </>
        )}
        <br />
        <div className="file-inputs">
          <input type="file" onChange={uploadHandler} />

          {!fileObj && (
            <button>
              <i>
                <FontAwesomeIcon icon={faPlus} />
              </i>
              Upload
            </button>
          )}
        </div>
        <br />

        <div className="inputs2">
          {!isLoading && fileObj && (
            <>
              <button
                class="submit"
                onClick={() => {
                  uploadFile(fileObj);
                  console.log("clicked");
                }}
              >
                <i>
                  <FontAwesomeIcon icon={faPlus} />
                </i>
                Submit
              </button>
            </>
          )}
        </div>

        {!isLoading && fileObj && (
          <>
            <button
              className="cancelBtn"
              onClick={() => {
                cancelUpload();
              }}
            >
              Cancel
            </button>
          </>
        )}

        <p className="main">Supported files</p>
        <p className="info">JPEG, GIF, JPG, PNG</p>
      </div>
    </>
  );
};

export default UploadBox;
