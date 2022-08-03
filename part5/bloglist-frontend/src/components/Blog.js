import React from "react";
import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const [blogObject, setBlogObject] = useState(blog);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = visible ? "hide" : "view";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const increaseLikes = () => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    };

    updateBlog(blogObject);
    setBlogObject(blogObject);
  };

  const removeBlog = () => deleteBlog(blog);

  return (
    <div style={blogStyle} className="blog">
      <div>
        <p>
          {blog.title} - {blog.author}{" "}
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p> {blog.url} </p>
        <p>
          {blogObject.likes}{" "}
          <button id="like-button" onClick={increaseLikes}>
            like
          </button>
        </p>
        <button onClick={removeBlog}>remove</button>{" "}
      </div>
    </div>
  );
};

export default Blog;
