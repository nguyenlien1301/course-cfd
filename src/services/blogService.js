import axiosInstance from "../utils/axiosInstance";

export const blogService = {
  getBlogs(query = "") {
    return axiosInstance.get(`/blogs${query}`);
  },
  getBlogsBySlug(slug) {
    return axiosInstance.get(`/blogs/${slug}`);
  },
  getBlogCategories(query = "") {
    return axiosInstance.get(`blog-categories${query}`);
  },
};
