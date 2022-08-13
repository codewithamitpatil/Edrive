import React from "react";
import "./SideBar.css";

import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <>
      <div className="sidebar">
        <section className="sidebar__section">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "sidebar__section__link sidebar__section__link--selected"
                : "sidebar__section__link"
            }
            to="/home"
          >
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8"></path>
              </g>
            </svg>
            <span>Home uuuu</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "sidebar__section__link sidebar__section__link--selected"
                : "sidebar__section__link"
            }
            to="/upload"
          >
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M11.23 13.08c-.29-.21-.48-.51-.54-.86-.06-.35.02-.71.23-.99.21-.29.51-.48.86-.54.35-.06.7.02.99.23.29.21.48.51.54.86.06.35-.02.71-.23.99a1.327 1.327 0 01-1.08.56c-.28 0-.55-.08-.77-.25zM22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-3.97-6.03L9.8 9.8l-3.83 8.23 8.23-3.83 3.83-8.23z"></path>
              </g>
            </svg>
            <span>Upload</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "sidebar__section__link sidebar__section__link--selected"
                : "sidebar__section__link"
            }
            to="/download"
          >
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M11.23 13.08c-.29-.21-.48-.51-.54-.86-.06-.35.02-.71.23-.99.21-.29.51-.48.86-.54.35-.06.7.02.99.23.29.21.48.51.54.86.06.35-.02.71-.23.99a1.327 1.327 0 01-1.08.56c-.28 0-.55-.08-.77-.25zM22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-3.97-6.03L9.8 9.8l-3.83 8.23 8.23-3.83 3.83-8.23z"></path>
              </g>
            </svg>
            <span>Download</span>
          </NavLink>
        </section>
      </div>
    </>
  );
};

export default SideBar;
