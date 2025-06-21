# TODO App Project

## Project Structure
- Backend: `/backend` - Spring Boot API server
- Frontend: `/frontend` - React application

## Technology Stack

### Backend
- Kotlin with Spring Boot 3
- Gradle 8.14.2 (Java 21)
- H2 in-memory database
- Spring Data JPA

### Frontend
- React with TypeScript
- Bootstrap 5.3
- REST API client using Fetch API

## Key Commands

### Backend
```bash
cd backend
./gradlew bootRun
```
- Runs on http://localhost:8080
- H2 Console: http://localhost:8080/h2-console

### Frontend
```bash
cd frontend
npm start
```
- Runs on http://localhost:3000

### Build Commands
```bash
# Backend
./gradlew build

# Frontend
npm run build
```

## API Endpoints
- `GET /api/todos` - Get all todos
- `GET /api/todos/{id}` - Get todo by ID
- `POST /api/todos` - Create new todo
- `PUT /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Delete todo

## Testing Strategy
When making changes, always run:
1. Backend: `./gradlew test`
2. Frontend: `npm test`

## Important Notes
- CORS is configured for localhost:3000
- Database is in-memory (data resets on restart)
- API returns JSON with camelCase properties