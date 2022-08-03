import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog componenet tests", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "urrllrlrlr",
    author: "Adrian Eu",
    likes: 7,
  };

  let mockUpdateBlog = jest.fn();
  let mockDeleteBlog = jest.fn();

  test("renders title and author", () => {
    const component = render(
      <Blog
        blog={blog}
        //updateBlog={mockUpdateBlog}
        //deleteBlog={mockDeleteBlog}
      />
    );

    expect(component.container).toHaveTextContent("8");
  });

  test("", () => {});
});
