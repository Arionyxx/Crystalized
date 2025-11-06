# Next.js + Express TypeScript Boilerplate

A full-stack TypeScript application boilerplate with Next.js 14 frontend, Express.js backend, and PostgreSQL database.

## 🚀 Features

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS
- **Backend**: Express.js with TypeScript, CORS enabled
- **Database**: PostgreSQL connection with connection pooling
- **Development**: Hot reload for both frontend and backend
- **Environment**: Proper environment variable setup

## 📁 Project Structure

```
├── frontend/                 # Next.js 14 frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # Utility functions
│   │   └── types/           # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── types/           # TypeScript types
│   │   └── index.ts         # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── package.json             # Root package with dev scripts
├── .env.example            # Environment variables template
└── README.md
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+ 
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-express-ts-boilerplate
```

2. Install dependencies for all packages:
```bash
npm run install:all
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database configuration
```

### Database Setup

Make sure your PostgreSQL server is running and update the database credentials in your `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
```

## 🚀 Development

Start both frontend and backend servers:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start both frontend and backend in production mode

## 📡 API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/test-db` - Test database connection

## 🗄️ Database

The backend is configured to connect to PostgreSQL using a connection pool. The database configuration is handled in `backend/src/config/database.ts`.

## 🎨 Frontend

The frontend uses Next.js 14 with the App Router, TypeScript, and Tailwind CSS for styling.

## 🔧 Backend

The backend uses Express.js with TypeScript and includes:
- CORS middleware
- JSON body parsing
- PostgreSQL connection pooling
- Health check endpoints

## 📝 Environment Variables

See `.env.example` for all available environment variables.

## 🚀 Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production servers:
```bash
npm run start
```

Make sure to configure your production environment variables before deploying.