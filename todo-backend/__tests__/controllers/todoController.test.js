const Todo = require("../../models/todoModel");
const todoController = require("../../controllers/todoControllers");
jest.mock("../../models/todoModel.js");
mockFind = jest.fn();
mockSave = jest.fn();
mockDelete = jest.fn();
Todo.find = mockFind;
Todo.findByIdAndDelete = mockDelete;
Todo.mockImplementation(() => ({
  save: mockSave,
}));

describe("When Todo Controller Is invoked", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      json: jest.fn(() => res),
      status: jest.fn(() => res),
    };
  });

  describe("For getTodos function", () => {
    it("Should return me all the todos, If everything goes right, ", async () => {
      const mockTodos = [
        { _id: 0, title: "Todo 1", completed: false },
        { _id: 1, title: "Todo 2", completed: false },
        { _id: 2, title: "Todo 3", completed: false },
      ];
      mockFind.mockResolvedValue(mockTodos);
      await todoController.getTodos(req, res);

      expect(mockFind).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTodos);
    });

    it("Should handle errors, If something goes wrong ", async () => {
      const errorMessage = "something went wrong, please try later";
      mockFind.mockRejectedValue(new Error(errorMessage));

      await todoController.getTodos(req, res);
      expect(mockFind).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("For addTodo function", () => {
    it("if everything is fine then it will add a todo", async () => {
      const newTodo = { _id: "1", title: "New Todo" };
      req.body = { title: "New Todo" };
      mockSave.mockResolvedValue(newTodo);
      await todoController.addTodo(req, res);
      expect(mockSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(newTodo);
    });

    it("it should handle error if soemthing goes wrong", async () => {
      const newTodo = { title: "new todo" };
      const errorMessage = "something went wrong, please try later";
      mockSave.mockRejectedValue(new Error(errorMessage));

      await todoController.addTodo(req, res);
      expect(mockSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    describe("for deleteTodo function", () => {
      it("If everything is  fine it should delete a todo", async () => {
        const deletedTodo = { id: "1", title: "New Todo", completed: "false" };
        mockDelete.mockResolvedValue(deletedTodo);
        const req = {
          query: {
            id: "1",
          },
        };

        await todoController.deleteTodo(req, res);
        expect(mockDelete).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(deletedTodo);
      });

      it("it should handle error if soemthing goes wrong", async () => {
        const deletedTodo = { id: "1", title: "New Todo", completed: "false" };
        const errorMessage = "something went wrong in deleting a todo";
        mockDelete.mockRejectedValue(new Error(errorMessage));
        const req = {
          query: {
            id: "1",
          },
        };
        await todoController.deleteTodo(req, res);
        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
      });
    });
  });
});
