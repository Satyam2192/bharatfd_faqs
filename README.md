# Multilingual FAQ Management System

A robust FAQ management system built with Node.js, Express, MongoDB, and Redis, featuring multilingual support and WYSIWYG editing capabilities.

## Features

- 🌐 Multilingual support (English, Hindi, Bengali)
- 📝 WYSIWYG editor for rich text content
- 🚀 Redis caching for optimized performance
- 🔄 Automatic translation using Google Translate API
- ⚡ RESTful API endpoints
- 🎛️ Admin panel for content management
- 🧪 Comprehensive test coverage

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- Google Cloud Project (for translation API)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/BharatFD.git
cd BharatFD
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Update the `.env` file with your configurations:
```env
MONGODB_URI=mongodb://localhost:27017/faqdb
REDIS_URL=redis://localhost:6379
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
GOOGLE_PROJECT_ID=your-project-id
PORT=3000
```

4. Start the application:
```bash
npm start
```

## Docker Deployment

Run with Docker Compose:
```bash
docker-compose up -d
```

## API Documentation

### Get FAQs

```bash
# Get FAQs in English (default)
GET /api/faqs

# Get FAQs in Hindi
GET /api/faqs?lang=hi

# Get FAQs in Bengali
GET /api/faqs?lang=bn
```

### Create FAQ

```bash
POST /api/faqs
Content-Type: application/json

{
  "question": "What is this application?",
  "answer": "This is a multilingual FAQ management system."
}
```

### Upload Files
```http
POST /api/faqs/upload
Content-Type: multipart/form-data
```

## Admin Panel

Access the admin panel at:
```
http://localhost:3000/admin
```

Default credentials:
- Email: admin@example.com
- Password: admin

## Testing

Run the test suite:
```bash
npm test
```

## Code Quality

Run linting:
```bash
npm run lint
npm run lint:fix  
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

