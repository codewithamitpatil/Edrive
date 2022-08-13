import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./DownloadBox.css";

export const DownloadBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [smsg, setSmsg] = useState("");
  const [emsg, setEmsg] = useState("");
  const [inputPin, setInputPin] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const downloadFile = async (pin) => {
    try {
      setSmsg("");
      setEmsg("");
      setIsLoading(true);
      const data = await axiosPrivate.post(`/api/storage/download/${pin}`, {});
      setIsLoading(false);
      setSmsg("File Downloaded Success Fully");
    } catch (error) {
      setIsLoading(false);
      setSmsg("");

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

  return (
    <div className="file-card1">
      <br />

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
        <input
          type="text"
          onChange={(e) => {
            setInputPin(e.target.value);
          }}
          className="form-control"
        />
      </div>
      <br />
      <br />
      <div className="inputs2">
        {!isLoading && (
          <>
            <button
              class="submit"
              onClick={() => {
                downloadFile(inputPin);
              }}
            >
              <i>
                <FontAwesomeIcon icon={faPlus} />
              </i>
              Download
            </button>
          </>
        )}
      </div>

      <p className="main">Enter pin to download files</p>
      {/* <p className="info">JPEG, GIF, JPG, PNG</p> */}
    </div>
  );
};
export default DownloadBox;
