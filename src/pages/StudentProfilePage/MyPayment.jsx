import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { formatCurrency, formatDate } from "../../utils/format";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {!paymentInfo.length && <p>Không có dữ liệu</p>}
      {paymentInfo.length &&
        paymentInfo.map((item, index) => {
          const { id, paymentMethod, createAt, course } = item;
          return (
            <div
              key={id || new Date().getTime() + index}
              className="itemhistory"
            >
              <div className="name">{course?.name}</div>
              <div className="payment">{paymentMethod}</div>
              <div className="date">{formatDate(createAt)}</div>
              <div className="money">{formatCurrency(course?.price || 0)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default MyPayment;
