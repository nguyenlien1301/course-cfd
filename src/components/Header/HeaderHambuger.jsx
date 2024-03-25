import React, { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";
import { useLocation } from "react-router-dom";

const HeaderHambuger = () => {
  const { isShowNavbar, handleShowNavbar } = useMainContext();
  const location = useLocation();
  useEffect(() => {
    if (isShowNavbar) {
      $("body").addClass("menu-show");
    } else {
      $("body").removeClass("menu-show");
    }
  }, [isShowNavbar]);
  const toggleMenu = (e) => {
    e.stopPropagation();
    handleShowNavbar?.(!isShowNavbar);
  };

  useEffect(() => {
    handleShowNavbar?.();
  }, [location.pathname]);
  return (
    <div
      className={`header__humburger ${!isShowNavbar ? "" : "--close"}`}
      onClick={toggleMenu}
    >
      <div className="header__humburger-button">
        <span />
        <span />
        <span />
      </div>
      <div className="header__humburger-text">
        <span>Menu</span>
        <span>Đóng</span>
      </div>
    </div>
  );
};

export default HeaderHambuger;
