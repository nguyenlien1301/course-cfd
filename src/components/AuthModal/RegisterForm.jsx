import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { REGEX } from "../../constants/regex";
import Input from "../Input";
import ComponentLoading from "../ComponentLoading";
import { MODAL_TYPE } from "../../constants/general";
import Button from "../Button";

const RegisterForm = () => {
  const { handleShowModal, handleCloseModal, handleRegister } =
    useAuthContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const objError = {};
    if (!form.name) {
      objError.name = "Vui lòng nhập name";
    }
    if (!form.email) {
      objError.email = "Vui lòng nhập email";
    } else if (!REGEX["email"].test(form.email)) {
      objError.email = "Vui lòng nhập đúng định dạng email";
    }

    if (!form.password) {
      objError.password = "Vui lòng nhập password";
    }
    if (!form.confirmPassword) {
      objError.confirmPassword = "Vui lòng xác nhận password";
    } else if (form.password && form.confirmPassword !== form.password) {
      objError.confirmPassword = "Mật khẩu xác nhận không đúng";
    }

    setError(objError);
    if (Object.keys(objError)?.length > 0) {
      console.log("Submit error", objError);
    } else {
      console.log("Submit success", form);
      setLoading(true);
      if (typeof handleRegister == "function") {
        handleRegister?.(form, () => {
          setTimeout(() => {
            setLoading(false);
            handleCloseModal();
          }, 300);
        });
      }
    }
  };
  return (
    <div
      className="modal__wrapper-content mdregister active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdlogin"
          onChange={() => handleShowModal(MODAL_TYPE.login)}
        >
          <strong>Đăng nhập</strong>
        </div>
      </div>
      <form onSubmit={_onSubmit} className="form">
        <div className="form-group">
          <Input
            label="Name"
            placeholder="Name"
            required
            {...register("name")}
          />
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
          <Input
            label="confirm password"
            placeholder="confirm password"
            type="password"
            required
            {...register("confirmPassword")}
          />
        </div>
        <Button className="form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
