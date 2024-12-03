import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../services/api";

const TodoDetailPage = () => {
  const { id } = useParams(); // Get checklist ID from URL params
  const [todoItems, setTodoItems] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation(); // Get the state passed from CreateTodoItemPage

  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const response = await api.get(`/todo/${id}`); // Fetch todo items for the checklist
        setTodoItems(response.data); // Set fetched items in state
      } catch (err) {
        console.error(err);
        alert("Failed to fetch todo items");
      }
    };
    fetchTodoItems();
  }, [id]);

  // If a new item was passed in the state, add it to the list
  useEffect(() => {
    if (state && state.newItem) {
      setTodoItems((prevItems) => [...prevItems, state.newItem]);
    }
  }, [state]);

  const toggleStatus = async (itemId, currentStatus) => {
    try {
      const updatedItem = await api.patch(`/todo/${itemId}`, {
        status: !currentStatus, // Toggle the status (complete/incomplete)
      });
      setTodoItems((prevItems) =>
        prevItems.map((item) => (item.id === itemId ? updatedItem.data : item))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await api.delete(`/todo/${itemId}`);
      setTodoItems(todoItems.filter((item) => item.id !== itemId)); // Remove deleted item from the list
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    }
  };

  return (
    <div>
      <h1>Checklist Items</h1>
      <button onClick={() => navigate(`/checklist/${id}/create-item`)}>
        Create New Item
      </button>
      <ul>
        {todoItems.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>Status: {item.status ? "Completed" : "Pending"}</p>
            <button onClick={() => toggleStatus(item.id, item.status)}>
              {item.status ? "Mark as Pending" : "Mark as Completed"}
            </button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoDetailPage;
