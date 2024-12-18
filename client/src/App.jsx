import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// Constants
const API_BASE_URL = "http://localhost:3000";

const App = () => {
  // State
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    }
  };

  // Add Todo
  const handleAddTodo = async () => {
    if (!input.trim()) {
      alert("Please enter a valid todo!");
      return;
    }

    try {
      await axios
        .post(`${API_BASE_URL}/post`, { todo: input })
        .then(() => console.log("Created item"))
        .catch((error) => alert("already exists in collection!"));
      setInput("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  // Delete Todo
  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${todoId}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  // onUbdate function

  // Perform the update
  const handleUpdateTodo = async (updateID, currentTodo) => {
    try {
      const updatedTodo = prompt("Edit your todo:", currentTodo); // Get updated value from the user
      if (updatedTodo) {
        await axios.put(`${API_BASE_URL}/update/${updateID}`, {
          todo: updatedTodo,
        });
        console.log("Updated successfully");
        fetchTodos(); // Refresh the todos
      }
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  // Lifecycle: Fetch Todos on Mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter something"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={() => handleDeleteTodo(todo._id)}
            onUbdate={() => handleUpdateTodo(todo._id, todo.todo)}
          />
        ))}
      </div>
    </div>
  );
};

// Todo Item Component
const TodoItem = ({ todo, onDelete, onUbdate }) => {
  return (
    <div className="todo-item">
      <p>{todo.todo}</p>
      <button className="delete-button" onClick={onDelete}>
        x
      </button>
      <button className="delete-button" onClick={onUbdate}>
        Edit
      </button>
    </div>
  );
};

export default App;
