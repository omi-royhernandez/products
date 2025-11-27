### Requirements
- Python 3.10+
- Node.js / npm
- PostgreSQL database
- Poetry

### Local Development
#### Frontend
- run `npm install`
- run `npm run dev` to start the server
- set .env file var `VITE_BACKEND_URL` to your backend api url

#### Backend
- poetry install
- set .env file var `DATABASE_URL` to your postgres database url
- also set `sqlalchemy.url` in `alembic.ini` file to your database url
- run `alembic upgrade head`
- start the backend server `uvicorn main:app --reload`