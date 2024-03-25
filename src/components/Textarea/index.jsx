import React from "react";

const Textarea = ({ error, ...rest }) => {
  return (
    <textarea
      className={`form__input ${error ? "formerror" : ""}`}
      style={{ resize: "none" }}
      {...rest}
    />
  );
};

export default Textarea;
