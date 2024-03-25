import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPE } from "../../constants/general";
import { tokenMethod } from "../../utils/token";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

const HeaderAuthen = () => {
  const { handleShowModal, handleLogout, profile } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const { profileImage, firstName } = profile || {};
  const _onShowDropdown = (e) => {
    e?.stopPropagation();
    setShowDropdown(true);
  };
  // hàm tắt dropdown
  const _onCloseDropdown = (e) => {
    e?.stopPropagation();
    setShowDropdown(false);
  };
  // Để bắt đc click của document thì dùng useEf và chỉ bắt 1 lần
  useEffect(() => {
    document.addEventListener("click", () => {
      _onCloseDropdown();
    });
    return () => {
      document.removeEventListener("click", () => {
        _onCloseDropdown();
      });
    };
  }, []);

  const _onRegisterClick = (e) => {
    e.stopPropagation();
    handleShowModal(MODAL_TYPE.register);
  };
  const _onLoginClick = (e) => {
    e.stopPropagation();
    handleShowModal(MODAL_TYPE.login);
  };
  const token = tokenMethod.get()?.accessToken;
  if (token) {
    return (
      <div className="header__logged">
        <div className="userlogged">
          <div
            className="userlogged__avatar user"
            data-dropdown="userlogged__dropdown"
            onClick={_onShowDropdown}
          >
            <div className="userlogged__avatar-img user__img">
              <img
                src={profileImage || "/img/cfd-share-thumbnail-facebook.png"}
                alt="Avatar teacher"
              />
            </div>
            <i className="userlogged__avatar-icon">
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3.5L7.00003 10.5L14 3.5H0Z" fill="white" />
              </svg>
            </i>
          </div>
          <div
            className={`userlogged__dropdown dropdown ${
              showDropdown ? "active" : ""
            }`}
          >
            <div className="userlogged__dropdown-info">
              <div className="user__img">
                <img
                  src={profileImage || "/img/cfd-share-thumbnail-facebook.png"}
                  alt="Avatar teacher"
                />
              </div>
              <Link to={PATHS.PROFILE.INDEX} className="user__info">
                <p className="title --t4">
                  <strong>{firstName || ""}</strong>
                </p>
                <span className="email">Thông tin tài khoản</span>
              </Link>
            </div>
            <div className="userlogged__dropdown-list">
              <Link to={PATHS.PROFILE.MY_COURSE}>Khóa học của tôi</Link>
              <Link to={PATHS.PROFILE.MY_PAYMENT}>Lịch sử thanh toán</Link>
              <Link to={PATHS.CONTACT}>Hỗ trợ</Link>
              <a href="" onClick={handleLogout}>
                Đăng xuất{" "}
                <i>
                  <img src="/img/iconlogout.svg" alt />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="header__auth">
      <div className="btn btn--transparent btnmodal" data-modal="mdlogin">
        <span onClick={_onRegisterClick}>Đăng ký /&nbsp;</span>
        <span onClick={_onLoginClick}>Đăng nhập</span>
      </div>
    </div>
  );
};

export default HeaderAuthen;
