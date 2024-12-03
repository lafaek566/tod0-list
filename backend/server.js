const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

// Register route
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User registered successfully" });
    }
  );
});

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.length === 0)
        return res.status(400).json({ message: "User not found" });

      const isMatch = bcrypt.compareSync(password, result[0].password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect password" });

      const token = jwt.sign({ userId: result[0].id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    }
  );
});

// Create checklist
app.post("/api/checklists", (req, res) => {
  const { title, userId } = req.body;

  db.query(
    "INSERT INTO checklists (title, user_id) VALUES (?, ?)",
    [title, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Checklist created successfully",
        checklistId: result.insertId,
      });
    }
  );
});

// Get checklists for a user
app.get("/api/checklists/:userId", (req, res) => {
  const { userId } = req.params;

  db.query(
    "SELECT * FROM checklists WHERE user_id = ?",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
});

// Create to-do item
app.post("/api/todo", (req, res) => {
  const { title, checklistId } = req.body;

  db.query(
    "INSERT INTO todo_items (title, checklist_id) VALUES (?, ?)",
    [title, checklistId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "To-Do item created successfully" });
    }
  );
});

// Get to-do items for a checklist
app.get("/api/todo/:checklistId", (req, res) => {
  const { checklistId } = req.params;

  db.query(
    "SELECT * FROM todo_items WHERE checklist_id = ?",
    [checklistId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
});

// Update to-do item status
app.put("/api/todo/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE todo_items SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "To-Do item updated successfully" });
    }
  );
});

// Delete to-do item
app.delete("/api/todo/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM todo_items WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "To-Do item deleted successfully" });
  });
});

// Delete checklist
app.delete("/api/checklist/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM checklists WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Checklist deleted successfully" });
  });
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
