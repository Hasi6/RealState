# Real Estate

## Technology Stack

- **Frontend:**

  - Nextjs with TypeScript

- **Backend:**
  - Nestjs with Fastify and TypeScript
  - Database: MongoDB
  - FileStore: Firebase Storage

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 18 (Recommended)
- Yarn package manager (Recommended)

## Getting Started

Follow these steps to get your project up and running.

### Backend

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   yarn OR npm install
   ```

2. Create a .env file in the backend folder and add the following content:

   ```
   PORT=5000
   MODE="DEV"
   MONGO_URI="mongodb+srv://hasitha:GwJ73HQEw8whHnju@cluster0.mogpfai.mongodb.net/real-state?retryWrites=true&w=majority"
   JWT_SECRET="Ao5QBMApRfRaLlRUHSpEroVZ00rtCYGPR4"
   JWT_EXPIRATION=3600
   ```

3. Start the backend server:

   ```
   yarn start:dev
   ```

### Frontend

1. Navigate to the frontend folder:

   ```
   cd frontend
   yarn OR npm install
   ```

2. Create a .env file in the frontend folder and add the following content:

   ```
   NEXT_PUBLIC_API_URL='http://localhost:5000/api/v1'
   ```

3. Start the frontend:

   ```
   yarn run dev
   ```

4. Run Test cases:

   ```
   yarn run test
   ```

### Credentials

- email: hasitha.chandula@gmail.com
- password: password
