# Task Manager Backend

Node.js + Express API server with MongoDB, JWT authentication, and core task management endpoints.

🔗 **API Base URL:** https\://<your-backend-url>

## Prerequisites

* Node.js ≥ 16.x
* MongoDB (local or Atlas)
* npm or yarn

## Setup & Development

```bash
git clone https://github.com/yourusername/task-manager-backend.git
cd task-manager-backend
npm install
npm run dev
```

The server runs on [http://localhost:5000](http://localhost:5000) by default.

## Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Endpoints

* **Auth**

  * `POST /api/auth/register`
  * `POST /api/auth/login`
* **Tasks**

  * `GET /api/tasks`
  * `POST /api/tasks`
  * `GET /api/tasks/:id`
  * `PUT /api/tasks/:id`
  * `DELETE /api/tasks/:id`

## Folder Structure

```
controllers/    # Route handlers
models/         # Mongoose schemas
routes/         # Route definitions
middlewares/    # Auth, error handling
server.js       # App entry point
```

## Features

* JWT-based authentication
* Secure password hashing (bcrypt)
* Task CRUD with validation
* Basic CORS configuration for frontend integration

## Notes

* "Assign task" endpoint stubbed; linking logic to user model in progress
* Notification model placeholders (real-time upgrades planned)
* Focused on core API stability; eager to learn advanced features next

## Why Express instead of NestJS

* **Simplicity & Control:** Express provides a minimal layer over Node.js, helping me understand fundamental HTTP concepts and middleware flow.
* **Learning Fundamentals:** As a fresher, I prioritized mastering core Node.js and REST API patterns before adopting higher-level abstractions.
* **Project Scope:** This MVP’s RESTful endpoints and middleware needs are well-served by Express without added complexity.
* **Future Plans:** I aim to explore NestJS in subsequent projects to leverage its modular architecture, dependency injection, and built-in tools.
