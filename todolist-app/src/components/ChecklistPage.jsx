import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Assuming you have axios setup in this api.js

const ChecklistPage = () => {
  const [checklists, setChecklists] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Ensure userId is set in localStorage

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
        const response = await api.get(`/checklists/${userId}`);
        setChecklists(response.data); // Store checklists in state
        console.log("Fetched Checklists:", response.data); // Debugging log
      } catch (err) {
        console.error(err);
        alert("Failed to fetch checklists");
      }
    };

    if (userId) {
      fetchChecklists();
    } else {
      alert("User not logged in");
    }
  }, [userId]);

  return (
    <div>
      <h1>Your Checklists</h1>
      <button onClick={() => navigate("/create-checklist")}>
        Create New Checklist
      </button>
      {checklists.length === 0 ? (
        <p>No checklists available. Create one now!</p>
      ) : (
        <ul>
          {checklists.map((checklist) => (
            <li key={checklist.id}>
              <h3>{checklist.title}</h3>
              <button onClick={() => navigate(`/checklist/${checklist.id}`)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChecklistPage;
