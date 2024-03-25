import React from "react";
import useMutation from "../../hooks/useMutation";
import ContactForm from "./ContactForm";
import ContactSidebar from "./ContactSidebar";
import ContactTitle from "./ContactTitle";
import { message } from "antd";
import { subscribesService } from "../../services/subscribesService";

const ContactPage = () => {
  const { execute, data, error, loading } = useMutation(
    subscribesService.subscribes
  );
  const handleFormSubmit = (formData) => {
    const payload = {
      name: formData.name || "",
      title: formData.topic || "",
      email: formData.email || "",
      description: formData.content || "",
    };
    execute?.(payload, {
      onSuccess: () => {
        setTimeout(() => {
          message.success("Gửi thành công");
        }, 300);
      },
      onFail: () => {
        setTimeout(() => {
          message.success("Gửi thất bại");
        }, 300);
      },
    });
  };
  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <ContactTitle />
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSidebar />
            <ContactForm handleFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
