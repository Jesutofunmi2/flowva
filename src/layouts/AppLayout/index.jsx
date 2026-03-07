import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./AppLayout.scss";
import HamburgerIcon from "../../assets/svgIcons/HamburgerIcon";
import CloseIcon from "../../assets/svgIcons/CloseIcon";
import globalStyles from "../../assets/styles/base/globalPage.module.scss";
import Images from "../../assets/images";
import useDashboard from "../../pages/appPages/AdminDashboard/useDashboard";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { displayName, candidate, profileImageUrl } = useDashboard();

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
            <div className="header-row">
              <div className="header-left">
                <button
                  type="button"
                  className="app-layout__hamburger"
                  aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                  aria-expanded={sidebarOpen}
                  onClick={() => setSidebarOpen((s) => !s)}
                >
                  {sidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
                </button>

                <h2 className="light-purple--text font-weight-bold">
                  Welcome {displayName}{" "}
                  {candidate
                    ? ` - ${candidate?.classes?.name} - ${candidate?.session}`
                    : ""}
                </h2>
              </div>

              <div className="header-right">
                <img
                  src={profileImageUrl || Images.logo}
                  alt={`${displayName}'s profile`}
                  className="profile-image"
                />
              </div>
            </div>
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
