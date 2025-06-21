# TODO App Project

## Project Structure
- Backend: `/backend` - Spring Boot API server
- Frontend: `/frontend` - React application

## Technology Stack

### Backend
- Kotlin with Spring Boot 3
- Gradle 8.14.2 (Java 21)
- H2 in-memory database (dev/test) / MySQL (beta/prod)
- Spring Data JPA

### Frontend
- React with TypeScript
- Bootstrap 5.3
- REST API client using Fetch API

## Environment Configuration

### Backend Environments
```bash
# Development (default)
./gradlew bootRun --args='--spring.profiles.active=dev'

# Beta
export DB_PASSWORD=beta_password
./gradlew bootRun --args='--spring.profiles.active=beta'

# Production
export DB_PASSWORD=prod_password
./gradlew bootRun --args='--spring.profiles.active=prod'
```

### Frontend Environments
```bash
# Development
npm start

# Beta
npm run start:beta

# Production  
npm run start:prod
```

### Build Commands
```bash
# Backend
./gradlew build

# Frontend
npm run build:dev    # Development build
npm run build:beta   # Beta build
npm run build:prod   # Production build
```

## API Endpoints
- `GET /todos` - Get all todos
- `GET /todos/{id}` - Get todo by ID
- `POST /todos` - Create new todo
- `PUT /todos/{id}` - Update todo
- `DELETE /todos/{id}` - Delete todo

## Database Configuration
- **Dev**: H2 in-memory (app_dev)
- **Beta**: MySQL (app_beta) at mysql.mysql:3306
- **Prod**: MySQL (app_prod) at mysql.mysql:3306
- **Test**: H2 in-memory (app_test)

## Testing Strategy
When making changes, always run:
1. Backend: `./gradlew test`
2. Frontend: `npm test`

## Environment URLs
- **Dev Frontend**: http://localhost:3000 → http://localhost:8080
- **Beta Frontend**: https://claude-code-todoapp.yamac-beta.net → https://claude-code-todoapp-api.yamac-beta.net
- **Prod Frontend**: https://claude-code-todoapp.yamac.net → https://claude-code-todoapp-api.yamac.net

## Important Notes
- CORS is configured per environment
- Database varies by environment (H2 for dev/test, MySQL for beta/prod)
- API paths changed from `/api/todos` to `/todos`