import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ title, subtitle, image, postId }) => {
  return (
    <div className="blog-card">
      <Link to={`/blog/${postId}`}>
        <img src={image}/>
      </Link>
      <Link to={`/blog/${postId}`}>
        <h3>{title}</h3>
      </Link>
      <p>{subtitle}</p>
    </div>
  );
};

export default BlogCard;
