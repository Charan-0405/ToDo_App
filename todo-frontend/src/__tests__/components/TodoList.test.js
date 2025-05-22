import React from "react";
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
  within,
} from "@testing-library/react";
import TodoList from "../../components/TodoList";
import BACKEND_URL from "../../config/config";

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});
global.fetch = jest.fn();
describe("Todo List Component", () => {
  test("Fetch the todos and also render them", async () => {
    const mockTodos = [
      { _id: "1", title: "Todo 1", completed: false },
      { _id: "2", title: "Todo 2", completed: false },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => mockTodos,
    });
    render(<TodoList />);
    await waitFor(() => {
      expect(screen.getByText("Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Todo 2")).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledWith(`${BACKEND_URL}/get-todos`);
  });

  test("Add a new Todo", async () => {
    const newTodo = { id: "1", title: "New Todo", completed: false };
    fetch
      .mockResolvedValueOnce({
        json: async () => [],
      })
      .mockResolvedValueOnce({
        json: async () => newTodo,
      });

    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a New Todo");
    const button = screen.getByRole("button", { name: "Add Todo" });
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledWith(
      `${BACKEND_URL}/add-todo`,
      expect.any(Object),
    );
  });

  test("Delete a Todo", async () => {
    const mockTodos = [
      { _id: "1", title: "Todo 1", completed: false },
      { _id: "2", title: "Todo 2", completed: false },
    ];
    const updatedTodos = [{ _id: "2", title: "Todo 2", completed: false }];
    fetch
      .mockResolvedValueOnce({
        json: async () => mockTodos,
      })
      .mockResolvedValueOnce({
        status: 200,
      });
    render(<TodoList />);
    await waitFor(() => {
      expect(screen.getByText("Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Todo 2")).toBeInTheDocument();
    });
    const todo1Item = screen.getByText("Todo 1").closest("li");
    const deleteButton = within(todo1Item).getByRole("button", {
      name: "Delete",
    });
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
      expect(screen.getByText("Todo 2")).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledWith(
      `${BACKEND_URL}/delete-todo?id=${1}`,
      expect.any(Object),
    );
  });
});
