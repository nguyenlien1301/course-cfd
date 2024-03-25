import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { REGEX } from "../../constants/regex";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";

const MyInfo = () => {
  const initialForm = useRef({
    firstName: "",
    email: "",
    phone: "",
    facebookURL: "",
    website: "",
    introduce: "",
  });
  const { profile, handleUpdateProfile } = useAuthContext();
  const [form, setForm] = useState(initialForm);
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
    if (!form.firstName) {
      objError.firstName = "Vui lòng nhập tên";
    }
    if (!form.phone) {
      objError.phone = "Vui lòng nhập số điện thoại";
    } else if (!REGEX["phone"].test(form.phone)) {
      objError.phone = "Vui lòng nhập đúng định dạng số điện thoại";
    }
    if (form.facebookURL && !REGEX["websiteURL"].test(form.facebookURL)) {
      objError.facebookURL = "Vui lòng nhập đúng định dạng facebookURL";
    }
    if (form.website && !REGEX["websiteURL"].test(form.website)) {
      objError.website = "Vui lòng nhập đúng định dạng website";
    }
    setError(objError);
    if (Object.keys(objError).length > 0) {
      console.log("Submit error", objError);
    } else {
      handleUpdateProfile?.(form);
    }
  };
  const isFormChanged =
    JSON.stringify(form) !== JSON.stringify(initialForm.current);

  useEffect(() => {
    if (profile) {
      const { firstName, email, phone, facebookURL, website, introduce } =
        profile;
      const newForm = {
        firstName,
        phone,
        email,
        facebookURL,
        website,
        introduce,
      };
      setForm(newForm);
      initialForm.current = newForm;
    }
  }, [profile]);
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form action="#" className="form">
        <div className="form-container">
          <Input
            label="Họ và tên"
            required
            placeholder="Họ và tên"
            {...register("firstName")}
          />
          <Input
            label="Số điện thoại"
            required
            placeholder="Số điện thoại"
            {...register("phone")}
          />
        </div>
        <div className="form-container">
          <Input
            label="Email"
            // required
            placeholder="Email"
            {...register("email")}
            disabled
          />
          <Input label="Mật khẩu" value={"******"} disabled />
        </div>
        <Input
          label="facebook URL"
          // required
          placeholder="facebook URL"
          {...register("facebookURL")}
        />
        <Input
          label="Website"
          // required
          placeholder="Website"
          {...register("website")}
        />
        <div className="form-container textarea">
          <Input
            label="Giới thiệu bản thân"
            // required
            placeholder="Giới thiệu bản thân"
            renderInput={(inputProps) => {
              return <Textarea {...inputProps} />;
            }}
            {...register("introduce")}
          />
        </div>
        <Button
          style={{
            width: "100%",
            pointerEvents: isFormChanged ? "all" : "none",
          }}
          variant="primary"
          onClick={_onSubmit}
          disabled={!isFormChanged}
        >
          Gửi
        </Button>
      </form>
    </div>
  );
};

export default MyInfo;
