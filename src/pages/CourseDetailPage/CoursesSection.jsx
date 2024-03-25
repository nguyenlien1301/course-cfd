import React from "react";
import { Empty, Skeleton } from "antd";
import CourseItem from "../../components/CourseItem";

const CoursesSection = ({ courses = [], loading }) => {
  return (
    <section className="courses">
      <div className="container">
        <div className="heading --center --noline">
          <h2 className="heading__title title --t2">Khoá học đề xuất</h2>
        </div>
        {loading &&
          Array(4)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="courses__list-item"
                style={{ height: "50vh" }}
              >
                <Skeleton active />
                <br />
                <Skeleton active />
              </div>
            ))}
        {!loading && courses?.length === 0 ? (
          <Empty
            description="Không tìm thấy dữ liệu"
            style={{ margin: "0 auto" }}
          />
        ) : (
          <div className="courses__list">
            {courses?.map((course, index) => {
              if (index < 3) {
                return <CourseItem key={course?.id || index} {...course} />;
              }
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
