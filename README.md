# Todo Application

## Overview

This project is a full-stack Todo Application built using React and Node.js.

It allows users to manage their daily tasks through a clean and responsive interface.

---

## Technologies Used

### Frontend

- React
- React Router DOM
- Axios
- CSS

### Backend

- Node.js
- Express.js
- UUID
- CORS

### Storage

- JSON File

---

## Features

- Add Todo
- Edit Todo
- Delete Todo
- Complete / Undo Todo
- Search Todo
- View Todo Details
- Multi-page React Application
- REST APIs

---

## Installation

### Backend

```bash
cd backend
npm install
node server.js


---

# Final Project Structure

Your project should now look like:

```text
todo-app/
│
├── backend/
│   ├── data/
│   │   └── todos.json
│   ├── routes/
│   │   └── todos.js
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── TodoDetails.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── node_modules/
│
├── README.md
├── FEATURES.md
├── API.md
└── .gitignore