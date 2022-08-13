import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./List1.css";

let data = [];

export const List1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);

  const uid = useSelector((state) => state.auth.user.uid);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchVideosFirst = async () => {
      try {
        const res = await axiosPrivate.get(`/api/storage/user`);
        setVideoData(res.data.docs);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };

    fetchVideosFirst();
    console.log("caleeee");
  }, []);

  const removeFile = async (key) => {
    const data = videoData.filter((item) => item._id !== key);
    setVideoData(data);
    const response = await axiosPrivate.delete(`/api/storage/${key}`, {});
    alert(response.data.message);
  };

  return (
    <>
      <div className="feed" id="feed1">
        <div class=" container container232">
          <h2>Your files</h2>
          <table class="table tableFile">
            <thead>
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Key</th>
                <th>Pin</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="tableController">
              {videoData &&
                videoData.map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.key}</td>
                      <td>{item.pin}</td>
                      <td>{item.contentType}</td>
                      <td>
                        <button
                          onClick={() => {
                            removeFile(item._id);
                          }}
                          className="btn btn-danger"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default List1;
