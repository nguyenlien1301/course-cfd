import React from "react";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/format";

const BlogItem = ({ image, slug, category, name, createAt, author }) => {
  return (
    <div className="blog__list-item">
      <div className="img">
        <Link to={`${PATHS.BLOG.INDEX}/${slug}`}>
          <img
            src={
              image ||
              "https://cfdcircle.vn/files/thumbnails/JuQE6Rd3DGuiHJOpgEb3Jg1KoLoa25OlLrl1pDQa.jpg"
            }
            alt={name}
            className="course__thumbnail"
          />
        </Link>
      </div>
      <div className="content">
        <p className="label">{category?.name}</p>
        <h2 className="title --t3">
          <Link to={`${PATHS.BLOG.INDEX}/${slug}`}>{name}</Link>
        </h2>
        <div className="content__info">
          <div className="user">
            <div className="user__img">
              <img src="/img/avatar_nghia.jpg" alt="Avatar teacher" />
            </div>
            <p className="user__name">{author}</p>
          </div>
          <div className="date">{formatDate(createAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
