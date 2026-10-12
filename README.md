# 📦 Delivery Service

A backend for a private delivery company that handles collecting and delivering parcels. Users register and log in, then create and track parcel orders with their delivery address and status. The API and its MongoDB database run together in Docker.

## ✨ Features

- **Register and log in** with bcrypt-hashed passwords and JSON Web Tokens.
- **Create parcel orders** with a parcel name, delivery address and status.
- **Track and update** an order's status as it moves from pickup to delivery.
- **List, view and delete** orders.
- **Runs in Docker** with one `docker compose` command.

## 🛠️ Built With

| Layer | Technology |
| --- | --- |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Auth | bcrypt, jsonwebtoken |
| DevOps | Docker, Docker Compose |
| Frontend | React (in the `frontend` submodule) |

## 🗂️ Project Structure

```
delivery-service/
├── index.js             # Express app, MongoDB connection, port 8000
├── routes/Todo.js       # API routes
├── controllers/Todo.js  # Route handlers
├── models/
│   ├── Todo.js          # Parcel order: parcel, Address, statuse + timestamps
│   └── User.js          # User: name, email, password
├── Dockerfile
├── docker-compose.yml
└── frontend/            # React client (git submodule)
```

## 🔌 API

All routes are under `/api`.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/register` | Create a user |
| POST | `/api/login` | Log in and receive a token |
| GET | `/api/todos` | List all parcel orders |
| GET | `/api/todo/:todoId` | Get one order |
| POST | `/api/todo/create` | Create an order |
| PUT | `/api/todo/:todoId/update` | Update an order (for example, its status) |
| DELETE | `/api/todo/:todoId/delete` | Delete an order |

**Example order**

```json
{
  "parcel": "Laptop box",
  "Address": "Amman, Jordan",
  "statuse": "Out for delivery"
}
```

## 🚀 Getting Started

**Requirements:** Docker and Docker Compose.

```bash
git clone --recurse-submodules https://github.com/YoumnaSalloum/delivery-service.git
cd delivery-service
docker compose up
```

Start the frontend in another terminal:

```bash
cd frontend
npm install
npm start
```

- Client: http://localhost:3000
- API: http://localhost (Docker Compose maps port 80 to the app's port 8000)

To run only the API container (API on http://localhost:9001):

```bash
docker run -it -p 9001:8000 -v $(pwd):/app docker-node
```

## 👩‍💻 Author

**Youmna Salloum** · [Portfolio](https://youmnasalloum.github.io/) · [LinkedIn](https://www.linkedin.com/in/youmna-salloum) · [GitHub](https://github.com/YoumnaSalloum)
