# Store Dashboard

A fullstack demo application with:
- Backend: Next.js (App Router), Prisma 7, PostgreSQL, Trigger.dev
- Frontend: Next.js, React, Tailwind CSS, Recharts
- Infra: Docker & Docker Compose

Random price, quantity, totalOrder
https://github.com/chryspii/assignment-magpie/blob/ead54489612a098b089e1a71896e68c999accbd0/backend/trigger/sync-store-data.ts#L9-L14

https://github.com/chryspii/assignment-magpie/blob/ead54489612a098b089e1a71896e68c999accbd0/backend/trigger/sync-store-data.ts#L17-L21

https://github.com/chryspii/assignment-magpie/blob/ead54489612a098b089e1a71896e68c999accbd0/backend/trigger/sync-store-data.ts#L107-L111

## AI Usage
#### Tools
- ChatGPT
#### Usage
- Generate Schema based on JSON Data
- Generate Project Structure in README.md
- Generate Chart components (Donut and Bar)

## Requirements
- Node.js 20
- Docker
- npm

## Project Structure
```
.
├── .env                     # Root env (Docker & shared vars)
├── backend/
│ ├── app/                   # Next.js App Router (API routes)
│ ├── lib/                   # Prisma client
│ ├── prisma/                # Prisma schema
│ ├── trigger/               # Trigger.dev jobs
│ ├── prisma.config.ts       # Prisma 7 config (ROOT for backend)
│ ├── trigger.config.ts      # Trigger.dev configuration
│ ├── Dockerfile
│ ├── .dockerignore
│ ├── package.json
│ ├── .env                   # Backend env (Docker)
│ └── .env.local             # Backend env (Docker)
├── frontend/
│ ├── app/                   # Next.js pages
│ ├── components/            # UI & charts
│ ├── Dockerfile
│ ├── package.json
│ ├── .env                   # Frontend env (Docker)
│ └── .env.local             # Frontend env (local dev)
├── docker-compose.yml
└── README.md
```

## Environment Variables
### Main Project
#### `.env`
```
POSTGRES_USER=[User]
POSTGRES_PASSWORD=[Password]
POSTGRES_DB=[storedb]
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/storedb
```

### Backend
#### `backend/.env`
```
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/storedb
```
#### `backend/.env.local`
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/storedb
```

### Frontend
#### `frontend/.env`
```
NEXT_PUBLIC_API_BASE_URL=http://backend:3000
```
#### `frontend/.env.local`
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### Running in Development
1. Start Backend, Frontend, PostgreSQL
From the root project
```
docker compose up
```
This will start
- PostgreSQL on `localhost:5432`
- Backend API on `http://localhost:3000`
- Frontend on `http://localhost:3001`

2. Run Prisma Migration (first time only)
Run on separated terminal
```
docker compose exec backend npx prisma migrate dev --name init
```

3. Run Trigger.dev
Trigger runs outside Docker
```
cd backend
npm run trigger-dev
```

### Run Without Docker
**Backend**
```
cd backend
npm install
npm run dev
```

**Frontend**
```
cd backend
npm install
npm run dev
```

**Trigger**
Trigger runs outside Docker
```
cd backend
npm run trigger-dev
```

### Production Build
**Build Images**
```
docker compose build --no-cache
```

**Run containers**
```
docker compose up -d
```
This will start
- Backend API on `http://localhost:3000`
- Frontend on `http://localhost:3001`
