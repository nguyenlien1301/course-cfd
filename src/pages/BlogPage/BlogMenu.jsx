import React from "react";
import { Link } from "react-router-dom";

const BlogMenu = ({ categorys, selectedCategory, setSelectedCategory }) => {
  // logic lấy id của catelogy
  const _onChangeCategory = (id) => {
    setSelectedCategory(id);
  };
  return (
    <div className="blog__menu">
      <Link
        onClick={(e) => {
          e.preventDefault();
          _onChangeCategory("");
        }}
        className={`blog__menu-item ${selectedCategory === "" ? "active" : ""}`}
      >
        Tất cả
      </Link>
      {categorys?.length &&
        categorys.map(({ id, name }) => {
          return (
            <Link
              key={id}
              className={`blog__menu-item ${
                selectedCategory === id ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                _onChangeCategory(id);
              }}
            >
              {name}
            </Link>
          );
        })}
    </div>
  );
};

export default BlogMenu;
