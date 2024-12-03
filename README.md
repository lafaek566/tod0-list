frontend :
 - npm create vite@latest todolist-app => reactjs => javascript
 - cd todolist-app
 - npm install
 - npm run dev

backend
 - git init -y
 - npm install express mysql2 cors bcryptjs jsonwebtoken dotenv
 - node server.js
 - .env : DB_HOST=localhost
    DB_USER=root
    DB_PASS=root
    DB_NAME=todo_db
    JWT_SECRET=secretkey


mysql
- connect in backend

api :
- import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

export default api;

