# TODO App

[![Backend Build](https://github.com/yamac-net/claude-code-todoapp/actions/workflows/backend-build.yml/badge.svg)](https://github.com/yamac-net/claude-code-todoapp/actions/workflows/backend-build.yml)
[![Frontend Build](https://github.com/yamac-net/claude-code-todoapp/actions/workflows/frontend-build.yml/badge.svg)](https://github.com/yamac-net/claude-code-todoapp/actions/workflows/frontend-build.yml)

A full-stack TODO application with separated frontend and backend architecture.

## Architecture

- **Backend**: Kotlin + Spring Boot 3 + Gradle Kotlin DSL
- **Database**: H2 Database + Spring JPA
- **Frontend**: React + TypeScript + Bootstrap 5.3
- **Java**: 21, Gradle: 8.14.2

## Project Structure

```
/
├── backend/          # Spring Boot API server
│   ├── src/main/kotlin
│   ├── build.gradle.kts
│   └── gradle/
└── frontend/         # React application
    ├── src/
    ├── package.json
    └── public/
```

## Features

- Create, edit, and delete todos
- Toggle todo completion status
- Progress tracking display
- Responsive UI with Bootstrap 5.3

## Setup and Running

### Prerequisites

- Java 21
- Node.js (latest version)
- Gradle 8.14.2 (or use Gradle Wrapper)

### Running the Backend

```bash
cd backend
./gradlew bootRun
```

The backend will start at http://localhost:8080

### Running the Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will start at http://localhost:3000

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/{id}` - Get specific todo
- `POST /api/todos` - Create todo
- `PUT /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Delete todo

## Database

Uses H2 in-memory database. Data will be reset when the application restarts.
H2 Console is accessible at http://localhost:8080/h2-console

### Connection Details
- JDBC URL: `jdbc:h2:mem:app_dev`
- User Name: `sa`
- Password: (leave blank)