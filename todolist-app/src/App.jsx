import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ChecklistPage from "./components/ChecklistPage";
import TodoDetailPage from "./components/TodoDetailPage";
import CreateTodoItemPage from "./components/CreateTodoItemPage";
import CreateChecklistPage from "./components/CreateChecklistPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login and Register Pages */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Checklists Pages */}
        <Route path="/checklists" element={<ChecklistPage />} />
        <Route path="/checklist/:id" element={<TodoDetailPage />} />
        <Route
          path="/checklist/:id/create-item"
          element={<CreateTodoItemPage />}
        />

        {/* Create New Checklist */}
        <Route path="/create-checklist" element={<CreateChecklistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
