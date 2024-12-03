import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getChecklists } from "../services/api";

const DashboardPage = () => {
  const { user } = useAuth();
  const [checklists, setChecklists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const token = localStorage.getItem("token");
      getChecklists(token)
        .then((response) => {
          setChecklists(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user, navigate]);

  return (
    <div>
      <h2>Welcome, {user ? user.name : "Guest"}</h2>
      <h3>Your Checklists:</h3>
      <ul>
        {checklists.map((checklist) => (
          <li key={checklist.id}>
            <button onClick={() => navigate(`/checklist/${checklist.id}`)}>
              {checklist.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
