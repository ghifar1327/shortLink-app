# Short Link App

A full-stack short link application built with Go, React, PostgreSQL, Redis, Docker, and Nginx.

## Repository Overview

This repository contains:

- `backend/` : Go backend API built with Gin
- `frontend/` : React + Vite frontend SPA
- `docker-compose.yml` : local deployment with Postgres, Redis, backend, frontend, and Nginx proxy
- `proxy.conf` : Nginx reverse proxy configuration for routing domain requests

## Clone from GitHub

1. Open a terminal.
2. Clone the repository:

```bash
git clone https://github.com/ghifar1327/shortLink-app.git
```

3. Change directory into the project:

```bash
cd final-phase
```

4. Start the stack:

```bash
docker compose up --build -d
```

## Project File Structure

```
final-phase/
├── backend/
│   ├── cmd/main.go
│   ├── db/migrations/
│   ├── internals/
│   │   ├── di/di.go
│   │   ├── routes/routes.go
│   │   ├── handlers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── dto/
│   │   └── middleware/
│   ├── uploads/
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .dockerignore
├── docker-compose.yml
├── proxy.conf
└── README.md
```

## How to Run

1. Build and start containers:

```bash
docker compose up --build -d
```

2. Open the browser:

```text
http://short.link-app
```

3. To stop the stack:

```bash
docker compose down
```

## Custom Domain Setup

Add the custom domain to `/etc/hosts`:

```text
127.0.0.1 short.link-app
```

If you change the domain, update:

- `proxy.conf` → `server_name`
- `docker-compose.yml` → `VITE_BASE_URL`

Then rebuild the proxy/frontend services.

## API Documentation

### Public Routes

- `GET /`
  - Returns a welcome message from the backend.

- `GET /swagger/*any`
  - Access Swagger API docs if available.

- `GET /:slug`
  - Redirects to the original URL by slug.

### Authentication

#### Register

- `POST /api/auth/register`
- Request body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirm_password": "password123"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "User registered successfully"
  }
  ```

#### Login

- `POST /api/auth/login`
- Request body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Response contains a token:
  ```json
  {
    "success": true,
    "message": "Login Success",
    "results": {
      "token": "JWT_TOKEN",
      "name": "John Doe",
      "picture": null,
      "user_id": 1,
      "email": "john@example.com",
      "created_at": "2026-04-09T..."
    }
  }
  ```

### Protected Routes

For these endpoints, include the header:

```http
Authorization: Bearer <JWT_TOKEN>
```

#### Upload Profile Picture

- `POST /api/user/:id/picture`
- Form data field: `picture` (file)
- Example path: `/api/user/1/picture`

#### Create Link

- `POST /api/links`
- Request body:
  ```json
  {
    "user_id": 1,
    "original_url": "https://example.com/page",
    "slug": "my-short-slug"
  }
  ```

#### Get User Links

- `GET /api/links/:user_id`
- Example: `/api/links/1`

#### Soft Delete Link

- `DELETE /api/links/:id`
- Example: `/api/links/10`

## Frontend Workflow

### Rebuild frontend service after code changes

```bash
docker compose up -d --build frontend
```

### Rebuild entire stack

```bash
docker compose down
docker compose up --build -d
```

### Development mode (optional)

If you want fast local frontend development:

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Ports

- `http://short.link-app` → frontend via Nginx proxy
- `http://localhost:5173` → frontend direct
- `http://localhost:8888` → backend direct
- `5432` → PostgreSQL
- `6379` → Redis

## Notes

- Backend environment variables are configured in `docker-compose.yml`.
- Nginx proxy forwards `/` to frontend and `/api/` plus `/uploads/` to backend.
- `backend/uploads` is mounted for file uploads.
