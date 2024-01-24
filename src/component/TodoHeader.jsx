import React from "react";

const TodoHeader = () => {
  return (
    <>
      <figure className="text-center mb-4">
        <img
          src="../images/todo.svg"
          className="figure-img mb-4"
          alt="Todo Logo"
        />
        <figcaption className="text-white h4">📝 Add Your List Here</figcaption>
      </figure>
    </>
  );
};

export default TodoHeader;
