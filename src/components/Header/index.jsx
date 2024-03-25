import React, { useEffect } from "react";
import HeaderHambuger from "./HeaderHambuger";
import HeaderLogo from "./HeaderLogo";
import HeaderAuthen from "./HeaderAuthen";
import { useLocation } from "react-router-dom";
import PATHS from "../../constants/paths";

const Header = () => {
  const { pathname } = useLocation();
  const isTransparent = [PATHS.HOME, PATHS.ABOUT].includes(pathname);
  useEffect(() => {
    // crollToTop
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else {
        if (isTransparent) {
          header.removeClass("--bgwhite");
        }
      }
    }
    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($(".header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }
    window.addEventListener("scroll", scrollBgHeader);
    return () => {
      window.removeEventListener("scroll", scrollBgHeader);
    };
  }, [isTransparent]);
  return (
    <header
      className={`header --transparent ${!isTransparent ? "--bgwhite" : ""}`}
    >
      <div className="container-fluid">
        <HeaderHambuger />
        <HeaderLogo />
        <HeaderAuthen />
      </div>
    </header>
  );
};

export default Header;
