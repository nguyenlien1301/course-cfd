import React from "react";
import { Empty } from "antd";
import BlogItem from "../../components/BlogItem/BlogItem";
import Pagination from "../../components/Pagination";

const BlogList = ({ blogs, loading }) => {
  return (
    <>
      {!!blogs?.length && (
        <>
          <div className={`blog__list ${loading ? "is-loading" : "is-loaded"}`}>
            {blogs.map((blog, index) => {
              return <BlogItem key={blog?.id || index} {...blog} />;
            })}
          </div>
          {!loading && <Pagination />}
        </>
      )}
      {!loading && !blogs?.length && (
        <Empty description="Không tìm thấy bài viết nào" />
      )}
    </>
  );
};

export default BlogList;
