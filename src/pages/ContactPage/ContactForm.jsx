import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import Textarea from "../../components/Textarea";
import { REGEX } from "../../constants/regex";

const ContactForm = ({ handleFormSubmit }) => {
  const inputRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    content: "",
  });
  const [error, setError] = useState({});
  const _onSubmitForm = () => {
    const errorObject = {};
    // start validate
    // nếu form.name có tồm tại thì gán cho name 1 text error vào error obj
    if (!form.name) {
      errorObject.name = "Họ và tên không được để trống";
    }
    if (!form.email) {
      errorObject.email = "Email không được để trống";
    } else if (!REGEX["email"].test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }
    if (!form.phone) {
      errorObject.phone = "Phone không được để trống";
    } else if (!REGEX["phone"].test(form.phone)) {
      errorObject.phone = "Vui lòng nhập đúng định dạng phone";
    }
    if (!form.topic) {
      errorObject.topic = "Topic không được để trống";
    }
    if (!form.content) {
      errorObject.content = "Content không được để trống";
    }
    setError(errorObject);
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error", errorObject);
    } else {
      console.log("Submit sucsess", form);
      handleFormSubmit?.(form);
      setForm({ name: "", email: "", phone: "", topic: "", content: "" });
      inputRef.current.focus();
    }
  };
  const register = (registerField) => {
    return {
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input
        ref={inputRef}
        label="Họ và tên"
        required
        placeholder="Họ và tên"
        {...register("name")}
      />
      <Input
        label="Email"
        required
        placeholder="Email"
        {...register("email")}
      />
      <Input
        label="Phone"
        required
        placeholder="Phone"
        {...register("phone")}
      />
      <Input
        label=" Chủ đề cần hỗ trợ"
        required
        {...register("topic")}
        renderInput={(inputProps) => (
          <Select
            options={[
              { value: "", label: "--" },
              { value: "react", label: "reactjs" },
              { value: "reponsive", label: "Web Reponsive" },
            ]}
            {...inputProps}
          />
        )}
      />
      <Input
        label="Nội dung"
        required
        {...register("content")}
        renderInput={(inputProps) => {
          return <Textarea {...inputProps} />;
        }}
      />
      <div className="btncontrol">
        <Button variant="primary" onClick={_onSubmitForm}>
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
