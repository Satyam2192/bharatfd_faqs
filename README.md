# FAQ Admin API

This project is a containerized Node.js application that provides an FAQ API with multilingual support and an administration dashboard powered by `AdminJS`. The application uses MongoDB as the primary database and Redis for caching, and it also provides file upload functionality via `Formidable`.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Using Docker](#using-docker)
  - [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)

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

  - Admin Crediantials:
   `ADMIN_EMAIL=admin@example.com`
   `ADMIN_PASSWORD=admin`

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

## Running Tests

1. **Ensure Dependencies are Installed:**

   ```bash
   npm install
   ```

2. **Run the Tests:**

   ```bash
   npm run test
   ```

