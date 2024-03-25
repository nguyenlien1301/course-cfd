import React from "react";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import useDebounce from "../../hooks/useDebounce";
import CourseItem from "../../components/CourseItem";
import { Empty, Skeleton } from "antd";

const CoursesPage = () => {
  const { data: coursesData, loading: coursesLoading } = useQuery(
    courseService.getCourses
  );
  const courses = coursesData?.courses || [];
  console.log(courses);
  const loading = useDebounce(coursesLoading, 300);
  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        {loading &&
          Array(4)
            .fill("")
            .map((_, index) => (
              <div key={index} className="courses__list-item">
                <Skeleton active style={{ height: "50vh" }} />
                <br />
                <Skeleton active />
              </div>
            ))}
        {!loading && courses?.length === 0 ? (
          <Empty
            description="Không tìm thấy dữ liệu nào"
            style={{ margin: "0 auto" }}
          />
        ) : (
          <div className="courses__list">
            {courses.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default CoursesPage;
