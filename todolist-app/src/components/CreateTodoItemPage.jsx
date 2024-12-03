import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const CreateTodoItemPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/todo", { title, checklistId: id });
      const newItem = response.data;
      // Navigate back and pass the new item as state to the TodoDetailPage
      navigate(`/checklist/${id}`, { state: { newItem } });
    } catch (err) {
      console.error(err);
      alert("Failed to create item");
    }
  };

  return (
    <div>
      <h1>Create To-Do Item</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTodoItemPage;
