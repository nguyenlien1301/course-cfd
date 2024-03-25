import React from "react";
import { tokenMethod } from "../../utils/token";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPE } from "../../constants/general";

const PrivateRoute = ({ redirecPath = "" }) => {
  const { handleShowModal } = useAuthContext();
  const navigate = useNavigate();
  if (!tokenMethod.get()?.accessToken) {
    handleShowModal?.(MODAL_TYPE.login);
    if (redirecPath) {
      return <Navigate to={redirecPath}></Navigate>;
    } else {
      navigate(-1);
    }
  }
  return <Outlet />;
};

export default PrivateRoute;
