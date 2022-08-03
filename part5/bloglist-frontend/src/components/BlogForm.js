import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  const handleTitleChange = (event) => {
    console.log(event.target.value);
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    console.log(event.target.value);
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    console.log(event.target.value);
    setNewUrl(event.target.value);
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        Author:
        <input value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        Url:
        <input value={newUrl} onChange={handleUrlChange} />
      </div>
      <button type="submit">submit blog</button>
    </form>
  );
};

export default BlogForm;
