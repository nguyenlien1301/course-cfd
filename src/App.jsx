import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import PATHS from "./constants/paths";
import { Spin } from "antd";
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const CourseOrderPage = lazy(() => import("./pages/CourseOrderPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const StudentProfilePage = lazy(() => import("./pages/StudentProfilePage"));
const PaymentMethodPage = lazy(() => import("./pages/PaymentMethodPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const MyInfo = lazy(() => import("./pages/StudentProfilePage/MyInfo"));
const MyCourse = lazy(() => import("./pages/StudentProfilePage/MyCourse"));
const MyPayment = lazy(() => import("./pages/StudentProfilePage/MyPayment"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

// import MainLayout from "./layouts/MainLayout";
// import HomePage from "./pages/HomePage";
// import ContactPage from "./pages/ContactPage";
// import AboutPage from "./pages/AboutPage";
// import CoursesPage from "./pages/CoursesPage";
// import CourseDetailPage from "./pages/CourseDetailPage";
// import CourseOrderPage from "./pages/CourseOrderPage";
// import BlogPage from "./pages/BlogPage";
// import BlogDetailPage from "./pages/BlogDetailPage";
// import StudentProfilePage from "./pages/StudentProfilePage";
// import PaymentMethodPage from "./pages/PaymentMethodPage";
// import PrivacyPage from "./pages/PrivacyPage";
// import MyInfo from "./pages/StudentProfilePage/MyInfo";
// import MyCourse from "./pages/StudentProfilePage/MyCourse";
// import MyPayment from "./pages/StudentProfilePage/MyPayment";
// // import PATHS from "./constants/paths";
// import PrivateRoute from "./components/PrivateRoute";

// config path nên tạo ra 1 file vì config như vậy khi sử dụng nhìu chỗ thì mỗi lần dùng là mỗi lần đổi + trường hợp thay đổi chỗ này nhưng chỗ kia ko đổi thì cả hệ thống sẽ ngưng hoạt động luôn.
// Tại sao page course order cần đc bảo vệ
// Vào nơi đăng kí khoá học thì có thông tin cá nhân trong đó đồng nghĩa là có profile, có profile info thì là phải đăng nhâọ rồi, có token rồi thì mới có profile info này
function App() {
  const spinStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  return (
    <Suspense fallback={<Spin style={spinStyle}></Spin>}>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={PATHS.COURSE.INDEX} element={<CoursesPage />} />
            <Route path={PATHS.COURSE.DETAIL} element={<CourseDetailPage />} />
            <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
            <Route path={PATHS.BLOG.DETAIL} element={<BlogDetailPage />} />
            <Route element={<PrivateRoute redirecPath={PATHS.HOME} />}>
              <Route path={PATHS.COURSE.ORDER} element={<CourseOrderPage />} />
              <Route
                path={PATHS.PROFILE.INDEX}
                element={<StudentProfilePage />}
              >
                <Route index element={<MyInfo />} />
                <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
                <Route
                  path={PATHS.PROFILE.MY_PAYMENT}
                  element={<MyPayment />}
                />
              </Route>
            </Route>
            <Route path={PATHS.PAYMENT} element={<PaymentMethodPage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
