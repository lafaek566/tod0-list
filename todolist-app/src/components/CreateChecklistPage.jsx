import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateChecklistPage = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Send the request to create a new checklist
      await api.post("/checklists", {
        title,
        userId: localStorage.getItem("userId"), // Assuming userId is stored in localStorage
      });
      navigate("/checklists"); // Redirect to the checklist page after creation
    } catch (err) {
      console.error(err);
      alert("Failed to create checklist");
    }
  };

  return (
    <div>
      <h1>Create Checklist</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Checklist Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateChecklistPage;
