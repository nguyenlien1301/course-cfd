import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { REGEX } from "../../constants/regex";
import ComponentLoading from "../ComponentLoading";
import { MODAL_TYPE } from "../../constants/general";
import Input from "../Input";
import Button from "../Button";

const LoginForm = () => {
  const { handleShowModal, handleLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  const _onSubmit = (e) => {
    e.preventDefault();
    const errObj = {};
    if (!form.email) {
      errObj.email = "Vui lòng nhập email";
    } else if (!REGEX["email"].test(form.email)) {
      errObj.email = "Vui lòng nhập đúng định dạng email";
    }

    if (!form.password) {
      errObj.password = "Vui lòng nhập password";
    }
    setError(errObj);

    if (Object.keys(errObj)?.length > 0) {
      console.log("Submit error", errObj);
    } else {
      setLoading(true);
      console.log("Submit success", form);
      handleLogin?.(form, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };

  return (
    <div
      className="modal__wrapper-content mdlogin active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModal(MODAL_TYPE.register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form">
        <div className="form-group">
          <Input
            label="Email"
            placeholder="Email"
            required
            {...register("email")}
          />
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            required
            {...register("password")}
          />
        </div>
        <Button className="form__btn-register" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
