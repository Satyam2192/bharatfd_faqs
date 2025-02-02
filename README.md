Below are updated versions of the Docker configuration and a new **README.md** file that you can include in your project. These updates assume you want to run the application in a containerized environment with Docker (and Docker Compose) while providing clear instructions for setup, development, and testing.

---

### Updated `Dockerfile`

```dockerfile
# Use an official Node.js runtime based on Alpine Linux
FROM node:16-alpine

# Create and change to the app directory
WORKDIR /app

# Copy dependency manifests and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build steps can be added here if needed, e.g., transpiling code

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

> **Notes:**
>
> - We are installing only production dependencies. If you need dev dependencies for development or testing, you can remove the `--production` flag.
> - If you plan to build assets (e.g., if you add a frontend build step), you can insert the appropriate build commands before exposing the port.

---

### Updated `docker-compose.yml`

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      mongodb:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: on-failure

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    healthcheck:
      test: ["CMD", "mongo", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongodb_data:
```

> **Highlights:**
>
> - **Healthchecks:** Added health checks for both MongoDB and Redis so that the `app` service waits until the dependent services are healthy.
> - **Restart Policy:** Configured `restart: on-failure` for improved resilience.
> - **Environment Variables:** The app still loads environment variables from the `.env` file.

---

### New `README.md`

```markdown
# FAQ Admin API

This project is a containerized Node.js application that provides an FAQ API with multilingual support and an administration dashboard powered by [AdminJS](https://adminjs.co/). The application uses MongoDB as the primary database and Redis for caching, and it also provides file upload functionality via [Formidable](https://github.com/node-formidable/formidable).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Using Docker](#using-docker)
  - [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **API Endpoints:**  
  - `GET /api/faqs`: Retrieve FAQs (supports language selection via query parameter `?lang=hi` for Hindi, `?lang=bn` for Bengali, default is English).
  - `POST /api/faqs`: Create a new FAQ entry (auto-translates from English to other supported languages).
  - `POST /api/faqs/upload`: Handle file uploads.

- **Admin Dashboard:**  
  A secure administration interface available at `/admin` built using AdminJS.

- **Caching:**  
  Redis is used to cache FAQ responses to boost performance.

- **Containerization:**  
  Docker and Docker Compose are used for easier setup and deployment.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (for containerized setup)
- [Node.js](https://nodejs.org/) (for local development without Docker)
- A [MongoDB](https://www.mongodb.com/) database (or use the provided Docker service)
- A [Redis](https://redis.io/) server (or use the provided Docker service)

## Getting Started

### Using Docker

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/faq-admin-api.git
   cd faq-admin-api
   ```

2. **Configure Environment Variables:**

   Create a `.env` file in the project root (if not already provided) and set the following variables:

   ```env
   # MongoDB connection URI (if not using Docker's MongoDB)
   MONGODB_URI=mongodb://mongodb:27017/faqdb

   # Redis connection configuration
   REDIS_HOST=redis
   REDIS_PORT=6379
   REDIS_USERNAME=default
   REDIS_PASSWORD=your-redis-password

   # Application port
   PORT=3000

   # Admin credentials
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin
   COOKIE_SECRET=your-secret-key
   ```

   > **Note:** When using Docker Compose, the `app` service will use the MongoDB and Redis services by name (`mongodb` and `redis` respectively).

3. **Build and Run the Containers:**

   ```bash
   docker-compose up --build
   ```

   The API will be accessible at [http://localhost:3000](http://localhost:3000) and the AdminJS dashboard at [http://localhost:3000/admin](http://localhost:3000/admin).

4. **Stopping the Containers:**

   To stop the containers, press `CTRL+C` in the terminal and run:

   ```bash
   docker-compose down
   ```

### Local Setup

If you prefer to run the application locally (without Docker):

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Configure Environment Variables:**

   Ensure you have a `.env` file at the project root with the appropriate values (see the [Environment Variables](#environment-variables) section).

3. **Start the Application:**

   ```bash
   npm start
   ```

   The application will run on [http://localhost:3000](http://localhost:3000).

## Environment Variables

The following environment variables can be configured in the `.env` file:

- **MongoDB:**
  - `MONGODB_URI`: Connection string for MongoDB.
  
- **Redis:**
  - `REDIS_HOST`: Redis host.
  - `REDIS_PORT`: Redis port.
  - `REDIS_USERNAME`: Redis username.
  - `REDIS_PASSWORD`: Redis password.
  
- **Application:**
  - `PORT`: Port number on which the API server runs.
  
- **Admin Credentials:**
  - `ADMIN_EMAIL`: Email address for AdminJS authentication.
  - `ADMIN_PASSWORD`: Password for AdminJS authentication.
  - `COOKIE_SECRET`: Secret key used for session cookies.

## Running Tests

1. **Ensure Dependencies are Installed:**

   ```bash
   npm install
   ```

2. **Run the Tests:**

   ```bash
   npm run test
   ```

