import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogDetailTitle from "./BlogDetailTitle";
import BlogDetailContent from "./BlogDetailContent";
import BlogDetailRelated from "./BlogDetailRelated";
import useMutation from "../../hooks/useMutation";
import { blogService } from "../../services/blogService";
import useDebounce from "../../hooks/useDebounce";

const BlogDetailPage = () => {
  const { blogSlug } = useParams();

  const {
    data: blogDetailData,
    loading: blogDetailLoading,
    execute: getBlogDetail,
  } = useMutation(blogService.getBlogsBySlug);
  const {
    data: blogsRelated,
    loading: blogsRelatedLoading,
    execute: getBlogsRelated,
  } = useMutation((query) => blogService.getBlogs(query));
  const blogProps = blogDetailData?.data || {};
  console.log("blogProps", blogProps);
  const categoryId = blogProps?.category?.id || "";
  const query = categoryId ? `?limit=3&category=${categoryId}` : "?limit=3";
  const loadingApi = blogDetailLoading || blogsRelatedLoading;
  const loadingPage = useDebounce(loadingApi, 300);
  useEffect(() => {
    blogSlug && getBlogDetail(blogSlug);
  }, [blogSlug]);
  useEffect(() => {
    if (query) {
      getBlogsRelated(query);
    }
  }, [query]);
  return (
    <main className="mainwrapper blogdetail --ptop">
      <div className="container">
        <div className="wrapper">
          <BlogDetailTitle {...blogProps} />
          <BlogDetailContent {...blogProps} loading={loadingPage} />
        </div>
        {query && (
          <BlogDetailRelated
            blogs={blogsRelated?.data?.blogs}
            loading={loadingPage}
          />
        )}
      </div>
    </main>
  );
};

export default BlogDetailPage;
