import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./AppLayout.scss";
import HamburgerIcon from "../../assets/svgIcons/HamburgerIcon";
import CloseIcon from "../../assets/svgIcons/CloseIcon";
import globalStyles from "../../assets/styles/base/globalPage.module.scss";
import { BellIcon } from "../../assets/svgIcons";
import useDashboard from "../../pages/appPages/Dashboard/useDashboard";
import { getPageTitle } from "../../helpers";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { displayName } = useDashboard();
  const { titleHtml, titleText } = getPageTitle({ displayName });

  return (
    <div className={`app-layout ${sidebarOpen ? "is-sidebar-open" : ""}`}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="app-layout__overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden={!sidebarOpen}
        />
      )}

      <div className="app-layout__main">
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div className={globalStyles.pageHeaders}>
            <div>
              <button
                type="button"
                className="app-layout__hamburger"
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen((s) => !s)}
              >
                {sidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
              <div
                className={globalStyles.pagePaddings}
                style={{ display: "inline-block" }}
              >
                <h6
                  className="app-layout__title"
                  {...(titleHtml
                    ? { dangerouslySetInnerHTML: { __html: titleHtml } }
                    : {})}
                >
                  {!titleHtml ? titleText : null}
                </h6>
              </div>
            </div>

            <button
              type="button"
              className="notification-button"
              style={{
                position: "relative",
                border: "none",
                backgroundColor: "#f2f2f2",
                padding: "8px",
                borderRadius: "50px",
                cursor: "pointer",
              }}
            >
              <BellIcon />
              <span
                className="notification-badge"
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-6px",
                  color: "#ff3b30",
                  padding: "2px 6px",
                  fontSize: "12px",
                  lineHeight: 1,
                  fontWeight: 500,
                }}
              >
                3
              </span>
            </button>
          </div>
        </header>

        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
