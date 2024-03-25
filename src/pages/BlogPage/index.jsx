import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import { blogService } from "../../services/blogService";
import BlogMenu from "./BlogMenu";
import BlogList from "./BlogList";
import useMutation from "../../hooks/useMutation";
import useDebounce from "../../hooks/useDebounce";

const BlogPage = () => {
  const { data: categoryData } = useQuery(blogService.getBlogCategories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categorys = categoryData?.blogs || [];
  const queryString = selectedCategory ? `?category=${selectedCategory}` : "";
  const {
    data: blogData,
    loading: blogLoading,
    execute: getBlogByCategory,
    setData,
  } = useMutation((callQuery) => blogService.getBlogs(callQuery));
  const loadingDebounce = useDebounce(blogLoading, 300);
  const blogs = blogData?.data?.blogs || [];
  const _onFail = (error) => {
    if (error) {
      setData([]);
    }
  };
  useEffect(() => {
    getBlogByCategory(queryString, {
      onFail: _onFail,
    });
  }, [queryString]);
  return (
    <main className="mainwrapper blog --ptop">
      <div className="container">
        <div className="textbox">
          <h2 className="title --t2">Blog</h2>
        </div>
        <div className="container">
          <BlogMenu
            categorys={categorys}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <BlogList blogs={blogs} loading={loadingDebounce} />
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
