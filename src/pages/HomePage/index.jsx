import React from "react";
import useQuery from "../../hooks/useQuery";
import HeroSection from "./HeroSection";
import CourseComingSection from "./CourseComingSection";
import CoursesSection from "./CoursesSection";
import TeacherSection from "./TeacherSection";
import FeaturedSection from "./FeaturedSection";
import TestimonialSection from "./TestimonialSection";
import FaqSection from "./FaqSection";
import GallerySection from "./GallerySection";
import CallRegisterSection from "./CallRegisterSection";
import { courseService } from "../../services/courseService";
import { teamService } from "../../services/teamService";
import { questionService } from "../../services/questionService";
import { galleryService } from "../../services/galleryService";

const HomePage = () => {
  const { data: courseData, loading: courseLoading } = useQuery(
    courseService.getCourses
  );
  const courses = courseData?.courses || [];
  const comingCourse =
    courses.filter((course) => {
      return course?.startDate && new Date(course?.startDate) > new Date();
    }) || [];
  // teams
  const {
    data: teamsData,
    error: teamsError,
    loading: teamsLoading,
  } = useQuery(teamService.getTeams);

  const teams = teamsData?.teams || [];
  // // question
  const {
    data: questionData,
    error: questionError,
    loading: questionLoading,
  } = useQuery(questionService.getQuestions);
  const questions = questionData?.questions || [];
  // gallery
  const {
    data: galleriesData,
    error: galleriesError,
    loading: galleriesLoading,
  } = useQuery(galleryService.galleries);

  const galleries = galleriesData?.galleries?.[0]?.images || [];
  return (
    <main className="mainwrapper">
      <HeroSection />
      <CourseComingSection courses={comingCourse} loading={courseLoading} />
      <CoursesSection courses={courses} loading={courseLoading} />
      <TeacherSection teachers={teams} loading={teamsLoading} />
      <FeaturedSection />
      {/* --------------------------------Testimonial-------------------------------- */}
      <TestimonialSection />
      {/* --------------------------------faq-------------------------------- */}
      <FaqSection questions={questions} loading={questionLoading} />
      <GallerySection galleries={galleries} loading={galleriesLoading} />
      <CallRegisterSection />
    </main>
  );
};

export default HomePage;
