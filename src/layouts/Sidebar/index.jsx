// src/layouts/Sidebar/index.jsx

import { NavLink } from "react-router-dom";
import Images from "../../assets/images";
import { appSidebarItems } from "../../localdata/appSidebarItems";
import "../AppLayout/AppLayout.scss";
import { useSidebar } from "./useSidebar";

const Sidebar = ({ open = false, onClose = () => {} }) => {
  const {
    signOut,
    displayEmail,
    displayName,
    profileImageUrl,
    profileMenuOpen,
    setProfileMenuOpen,
    profileRef,
  } = useSidebar();
  return (
    <>
      <aside
        className={`sidebar ${open ? "open" : ""}`}
        role="navigation"
        aria-label="Main"
      >
        <div className="sidebar__top">
          <img src={Images.logo} alt="FlowvaHub" className="sidebar__logo" />
        </div>

        <nav className="sidebar__nav">
          {appSidebarItems.map(({ key, name, icon, routePath }) => (
            <NavLink
              key={key}
              to={routePath}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar__item ${isActive ? "active" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="sidebar__icon">
                    {icon && icon(isActive)}
                  </span>
                  <span className="sidebar__label">{name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__bottom">
          <div
            className="sidebar__profile"
            onClick={() => setProfileMenuOpen((s) => !s)}
            ref={profileRef}
            role="button"
            tabIndex={0}
          >
            <img
              src={profileImageUrl || Images.logo}
              alt="profile"
              className="sidebar__avatar"
              onError={(e) => {
                e.currentTarget.src = Images.logo;
              }}
              referrerPolicy="no-referrer"
            />
            <div className="sidebar__profile-info">
              <div className="sidebar__name">{displayName || "User"}</div>
              <div className="sidebar__email">{displayEmail || ""}</div>
            </div>
          </div>

          {profileMenuOpen && (
            <div className="sidebar__profile-menu" role="menu">
              <button className="sidebar__profile-menu-item" onClick={signOut}>
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      <div
        className={`sidebar__overlay ${open ? "visible" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
    </>
  );
};

export default Sidebar;
