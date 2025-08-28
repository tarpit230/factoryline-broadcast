# Factory Line Broadcast System

## Tech Stack

### Frontend
- React.js with Vite
- WebSocket for real-time updates
- React Router for navigation
- Environment: Node.js

### Backend
- Node.js
- Express.js
- PostgreSQL for database
- WebSocket for real-time communication

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd factoryline-be
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables - Create `.env` file:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=factoryline
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   ```

4. Start the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd factoryline-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables - Create `.env` file:
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend development server will run on http://localhost:5173

## Build for Production

### Frontend Build
```bash
cd factoryline-fe
npm run build
```
The build output will be in the `dist` directory.

### Backend Build
```bash
cd factoryline-be
npm run build
```
