import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { courseService } from "../../services/courseService";
import HeroSection from "./HeroSection";
import ContentDetailSection from "./ContentDetailSection";
import FeaturedSection from "../HomePage/FeaturedSection";
import FaqSection from "../HomePage/FaqSection";
import CoursesSection from "./CoursesSection";
import HeaderTop from "../../components/HeaderTop";
import { ROLES } from "../../constants/roles";
import { formatCurrency, formatDate } from "../../utils/format";
import useQuery from "../../hooks/useQuery";
import { questionService } from "../../services/questionService";

const CourseDetailPage = () => {
  const params = useParams();
  const { courseSlug } = params;
  console.log("courseSlug", courseSlug);
  // 3. lấy danh sách question
  const { data: questionData, loading: questionLoading } = useQuery(
    questionService.getQuestions
  );
  const questions = questionData?.questions || [];
  // 2. Lấy danh sách khoá học đề xuất
  const { data: courseData, loading: courseLoading } = useQuery(
    courseService.getCourses
  );
  const courses = courseData?.courses || [];
  // 1. Lấy chi tiết khoá học
  const {
    data: courseDetailData,
    loading: courseDetailLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);
  useEffect(() => {
    if (courseSlug) execute(courseSlug || "");
  }, [courseSlug]);
  // modyfile data
  const coursesDetail = courseDetailData?.data || [];
  const orderLink = `/course-order/${courseSlug}`;
  const { teams, startDate, price } = coursesDetail || {};
  const modifiedProps = {
    ...coursesDetail,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)),
    startDate: formatDate(startDate || ""),
    price: formatCurrency(price),
    orderLink,
  };
  return (
    <>
      <HeaderTop {...modifiedProps} />
      <main className="mainwrapper coursedetailpage">
        <HeroSection {...modifiedProps} />
        <ContentDetailSection {...modifiedProps} />
        <FeaturedSection {...modifiedProps} />
        <FaqSection questions={questions} loading={questionLoading} />
        <CoursesSection courses={courses} loading={courseLoading} />
      </main>
    </>
  );
};

export default CourseDetailPage;
