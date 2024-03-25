import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { tokenMethod } from "../utils/token";
import PATHS from "../constants/paths";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/orderService";
import { authService } from "../services/authService";

export const AuthContext = createContext({});
export const AuthContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState("");
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const handleGetProfile = async () => {
    try {
      const res = await authService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  const handleGetProfileCourse = async () => {
    try {
      const res = await orderService.getCourseHistories();
      const orderCourse = res?.data?.data.orders || [];
      setCourseInfo(orderCourse);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleGetProfilePayment = async () => {
    try {
      const res = await orderService.getPaymentHistories();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(payments);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUpdateProfile = async (formData) => {
    if (!formData) return;
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName || "",
      email: formData.email,
      facebookURL: formData.facebookURL,
      website: formData.website,
      phone: formData.phone,
      introduce: formData.introduce,
    };
    try {
      const res = await authService.updateProfile(payload);
      if (res?.data?.data?.id) {
        setProfile(res);
        message.success("Cập nhật thành công");
        handleGetProfile();
      }
    } catch (error) {
      console.log("error", error);
      message.error("Cập nhật thất bại!");
    }
  };

  const handleShowModal = (modalType) => {
    setShowModal(modalType || "");
  };
  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowModal("");
  };

  const handleLogin = async (loginData, callback) => {
    // Muốn xử lí api thì phải xử lí payload trước
    const payload = { ...loginData };
    // xử lí api login
    try {
      const res = await authService.login(payload);
      if (res?.data) {
        message.success("Đăng nhập thành công");
        // đăng nhập thành công nó sẽ trả về token
        const { token: accessToken, refreshToken } = res.data?.data || {};
        // Lưu token vào localstogate or cooki
        tokenMethod.set({ accessToken, refreshToken });
        // lấy thông tin profile
        handleGetProfile();
        // phải check thêm 1 điều kiện là khi có courseInfo.lenght thì phải gọi hàm handleGetProfileCourse();
        // handleGetProfilePayment(); để nó có data
        // gọi khoá học đã dăng kí
        handleGetProfileCourse();
        // gọi lịch sử khoá học
        handleGetProfilePayment();
        // tắt modal
        handleCloseModal();
      } else {
        message.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.log("error----", error);
      message.error("Đăng nhập thất bại");
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    const { name, email, password } = registerData || {};
    // xử lí payload
    const payload = {
      firstName: name,
      lastName: "",
      email,
      password,
    };
    // gọi api xử lí register
    try {
      const res = await authService.register(payload);
      console.log(res);
      if (res?.data) {
        message.success("Đăng kí thành công");
        handleLogin({
          email,
          password,
        });
      } else {
        message.error("Đăng kí thất bại");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      callback?.();
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    tokenMethod.remove();
    setProfile(undefined);
    navigate?.(PATHS.HOME);
    message.success("Tài khoản đã đăng xuất");
  };

  useEffect(() => {
    const accessToken = tokenMethod.get()?.accessToken;
    if (accessToken) {
      handleGetProfile();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        showModal,
        courseInfo,
        paymentInfo,
        handleShowModal,
        handleGetProfile,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetProfileCourse,
        handleGetProfilePayment,
        handleUpdateProfile,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
