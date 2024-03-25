import React from "react";
import Button from "../../components/Button";
import PATHS from "../../constants/paths";
import { Empty } from "antd";
import CourseItem from "../../components/CourseItem";

const CoursesSection = ({ courses = [], loading = false }) => {
  return (
    <section className="courses">
      <div className="container">
        <div className="heading">
          <h2 className="heading__title title --t2">
            Tất cả <span className="color--primary">khóa học</span>
          </h2>
        </div>
        {!loading && courses?.length === 0 ? (
          <Empty
            description="Không tìm thấy khoá học nào"
            style={{ margin: "0 auto" }}
          />
        ) : (
          <>
            <div className="courses__list">
              {courses.map((course, index) => {
                return <CourseItem key={course?.id || index} {...course} />;
              })}
            </div>
            <div className="courses__btnall">
              <Button
                link={PATHS.COURSE.INDEX}
                // className="course__btn"
                variant="grey"
              >
                Tất cả khoá học
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
