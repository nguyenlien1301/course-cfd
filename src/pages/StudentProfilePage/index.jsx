import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { NavLink, Outlet } from "react-router-dom";

const StudentProfilePage = () => {
  const { profile } = useAuthContext();
  const { firstName, introduce, email, phone, facebookURL, website } =
    profile || {};
  return (
    <main className="mainwrapper profilepage">
      <div className="container">
        <div className="wrapper">
          <div className="sidebar">
            <div className="sidebar__info">
              <div className="useravatar">
                <div className="avatar">
                  <div className="img">
                    <img src="/img/avatar_nguyenlien.jpg" alt="avatar" />
                  </div>
                </div>
                <h3 className="title --t3">{firstName || "--"}</h3>
              </div>
            </div>
            <div className="sidebar__content">
              <h4>Giới thiệu</h4>
              <p className="description">{introduce || "--"}</p>
              <ul>
                <li>
                  <img src="/img/icon-mail-outline.svg" alt="icon" />
                  <span>{email || "--"}</span>
                </li>
                <li>
                  <img src="/img/icon-phone-outline.svg" alt="icon" />
                  <span>{phone || "--"}</span>
                </li>
                <li>
                  <img src="/img/icon-facebook-outline.svg" alt="icon" />
                  {facebookURL ? (
                    <a href={facebookURL} target="_blank">
                      {facebookURL}
                    </a>
                  ) : (
                    "--"
                  )}
                </li>
                <li>
                  <img src="/img/icon-link.svg" alt="icon" />
                  {website ? (
                    <a href={website} target="_blank">
                      {website}
                    </a>
                  ) : (
                    "--"
                  )}
                </li>
              </ul>
              <div className="social">
                <a href="#">
                  <img src="/img/icon-facebook-dark.svg" alt />
                </a>
                <a href="#">
                  <img src="/img/icon-linkedin-dark.svg" alt />
                </a>
                <a href="#">
                  <img src="/img/icon-youtube-dark.svg" alt />
                </a>
              </div>
            </div>
          </div>
          <div className="tabwrap">
            <div className="tab">
              <div className="tab__title">
                <NavLink end to="/profile">
                  Thông tin cá nhân
                </NavLink>
                <NavLink to="/profile/my-course">Khóa học của tôi</NavLink>
                <NavLink to="/profile/my-payment">Lịch sử thanh toán</NavLink>
              </div>
              <div className="tab__content">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudentProfilePage;
