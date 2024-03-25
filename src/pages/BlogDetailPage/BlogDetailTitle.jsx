import React from "react";
import { formatDate } from "../../utils/format";

const BlogDetailTitle = ({ name, author, createdUser, createdAt }) => {
  return (
    <div className="blogdetail__title">
      <h1 className="title --t2">{name}</h1>
      <ul className="meta">
        {author && <li className="meta__item">{author}</li>}
        {createdUser?.name && (
          <li className="meta__item">{createdUser?.name}</li>
        )}
        {createdAt && <li className="meta__item">{formatDate(createdAt)}</li>}
      </ul>
    </div>
  );
};

export default BlogDetailTitle;
