import React, { useEffect, useState } from "react";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import useMutation from "../../hooks/useMutation";
import { useNavigate, useParams } from "react-router-dom";
import { courseService } from "../../services/courseService";
import { formatCurrency } from "../../utils/format";
import { ROLES } from "../../constants/roles";
import Button from "../../components/Button";
import { message } from "antd";
import { orderService } from "../../services/orderService";
import PATHS from "../../constants/paths";
import { REGEX } from "../../constants/regex";
import { useAuthContext } from "../../context/AuthContext";

const CourseOrderPage = () => {
  const navigate = useNavigate();
  const { courseSlug } = useParams();
  const { data: courseDetailData, execute: executeCourseDetail } = useMutation(
    courseService.getCourseBySlug
  );
  useEffect(() => {
    if (courseSlug) {
      executeCourseDetail?.(courseSlug, {});
    }
  }, [courseSlug]);
  const courseDetail = courseDetailData?.data || [];
  const { teams, price, tags } = courseDetail || {};
  const modifiedInfoOrder = {
    ...courseDetail,
    teacherInfo:
      teams?.find((item) => item?.tags.includes(ROLES.teacher)) || {},
    price: formatCurrency(price),
  };

  // get profile
  const {
    profile,
    courseInfo,
    handleGetProfileCourse,
    handleGetProfilePayment,
  } = useAuthContext();
  const isAllReadyOrder =
    courseInfo?.some((item) => item?.course?.slug === courseSlug) || false;
  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
  } = profile || {};
  // handle profile form
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
  });
  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  const _onSubmit = () => {
    // e.preventDefault();
    const objError = {};
    if (!form.name) {
      objError.name = "Vui lòng nhập tên";
    }
    if (!form.email) {
      objError.email = "Vui lòng nhập email";
    } else if (!REGEX["email"].test(form.email)) {
      objError.email = "Vui lòng nhập đúng định dạng email";
    }
    if (!form.phone) {
      objError.phone = "Vui lòng nhập số điện thoại";
    } else if (!REGEX["phone"].test(form.phone)) {
      objError.phone = "Vui lòng nhập đúng định dạng phone";
    }
    if (!form.type) {
      objError.type = "Vui lòng chọn hình thức học";
    }
    setError(objError);
    if (Object.keys(objError)?.length > 0) {
      console.log("Submit error", objError);
    } else {
      console.log("Submit success", form);
    }
  };

  useEffect(() => {
    if (isAllReadyOrder && courseInfo?.length > 0) {
      const orderCourse =
        courseInfo?.find((item) => item?.course?.slug === courseSlug) || false;
      console.log(" orderCourse", orderCourse);
      setForm({
        name: orderCourse.name || "",
        email: profileEmail || "",
        phone: orderCourse.phone || "",
        type: orderCourse.type || "",
      });
      setPaymentMethod(orderCourse.paymentMethod);
    } else {
      setForm({
        name: profileName || "",
        email: profileEmail || "",
        phone: profilePhone || "",
        type: "",
      });
    }
  }, [profileName, profileEmail, profilePhone, isAllReadyOrder, courseInfo]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };
  console.log("paymentMethod", paymentMethod);

  // handle orderCourse
  const { loading: orderLoading, execute: orderCourse } = useMutation(
    orderService.orderCourse
  );

  // tạo hàm _onOrder
  const _onOrder = () => {
    // validate form
    const profileError = _onSubmit();
    console.log(profileError);
    if (profileError && Object.keys(profileError).length > 0) {
      console.log("profileError", profileError);
    } else {
      if (paymentMethod) {
        // call api
        // Chuẩn bị payload
        const payload = {
          name: form.name,
          phone: form.phone,
          course: courseDetailData?.data?.id,
          type: form.type,
          paymentMethod,
        };

        orderCourse(payload, {
          onSuccess: async () => {
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            message.success("Đăng kí thành công");
            navigate(PATHS.PROFILE.MY_COURSE);
          },
          onFail: () => {
            message.error("Đăng kí thất bại");
          },
        });
      } else {
        // check payment
        message.error("Vui lòng chọn phương thức thanh toán");
      }
    }
  };

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...modifiedInfoOrder} />
          <FormOrder
            register={register}
            types={tags || []}
            disabled={isAllReadyOrder}
          />
          <PaymentOrder
            handleChange={handlePaymentMethodChange}
            selectedPayment={paymentMethod}
            disabled={isAllReadyOrder}
          />
          <Button
            onClick={_onOrder}
            disabled={isAllReadyOrder}
            style={{ width: "100%" }}
          >
            <span>{isAllReadyOrder ? "Đã đăng kí" : "Đăng ký khoá học"}</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
