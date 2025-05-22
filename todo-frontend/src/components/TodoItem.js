import React from "react";
const TodoItem = ({ todo, onDelete, onComplete }) => {
  console.log(todo);
  return (
    <li>
      {todo.title}
      <button onClick={() => onDelete(todo)}>Delete</button>{" "}
    </li>
  );
};
export default TodoItem;
