import React, { useState } from "react";

import TopBar from "../components/TopBar/TopBar";
import SideBar from "../components/SideBar/SideBar";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const LayOut1 = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <>
      <TopBar />
      {showSidebar && <SideBar />}
      <div className={showSidebar ? "LeftSectionA2" : "LeftSectionA1"}>
        <Outlet />
      </div>
    </>
  );
};

export default LayOut1;
