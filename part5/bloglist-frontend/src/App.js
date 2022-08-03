import React from "react";
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      getAllBlogs();
    }
  }, []);

  const getAllBlogs = async () => {
    const allBlogs = await blogService.getAll();

    allBlogs.forEach((blog) => {
      const temp = blog.user.id;
      blog.user = temp;
    });

    setBlogs(allBlogs);
  };

  const handleLogout = (event) => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      setUsername("");
      setPassword("");
    }
  };

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const createdBlog = await blogService.create(blogObject);

    setBlogs(blogs.concat(createdBlog));

    setMessage(`Blog ${blogObject.title} was successfully added`);

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const updateBlog = async (blogToUpdate) => {
    const updatedBlog = await blogService.update(blogToUpdate.id, blogToUpdate);
    setMessage(`Blog ${blogToUpdate.title} was successfully updated`);
    setTimeout(() => {
      setMessage("");
    }, 5000);

    setBlogs(
      blogs.map((blog) => (blog.id !== blogToUpdate.id ? blog : updatedBlog))
    );
  };

  const deleteBlog = async (blogToDelete) => {
    if (window.confirm(`Delete ${blogToDelete.title} ?`)) {
      await blogService.remove(blogToDelete.id);
      setMessage(`Blog ${blogToDelete.title} was successfully deleted`);
      setTimeout(() => {
        setMessage("");
      }, 5000);

      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
    }
  };

  const sortLikes = (b1, b2) => b2.likes - b1.likes;
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user !== null && (
        <div>
          {" "}
          <p>
            {user.username} is logged-in{" "}
            <button onClick={handleLogout}> Logout</button>
          </p>{" "}
          <h2>create new</h2>
          <Togglable buttonLabel="create" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>{" "}
          {blogs.sort(sortLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
