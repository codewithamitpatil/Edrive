import React, { useState, useEffect } from "react";
import "./TopBar.css";
import * as Realm from "realm-web";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useLogout from "../../hooks/useLogout";

export const TopBar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const logout = useLogout();

  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const getAutoComplete = async () => {
    try {
      const REALM_APP_ID = "youreal-tfmah";
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();

      const user = await app.logIn(credentials);
      const searchProducts = await user.functions.autoComplete(searchInput);
      console.log(searchProducts);

      setSearchData(() => searchProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    const from =
      location.state?.from?.pathname || `/search?term=${searchInput}`;
    navigate(from, { replace: false });
  };

  return (
    <>
      <nav className="navigation">
        <div className="navigation__menu">
          <span style={{ width: "30%", color: "white" }}>Youtube</span>
        </div>
        {/* search box */}

        {/*  profile and logout  */}
        <div className="navigation__options">
          <div className="dropdown">
            <div className="" data-toggle="dropdown">
              <img
                className="feed__item__info__avatar1"
                alt=""
                src="/game.png"
              />
            </div>

            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Profile
              </a>
              <span
                className="dropdown-item"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </span>
            </div>
          </div>

          <div></div>
        </div>
      </nav>
    </>
  );
};

export default TopBar;
