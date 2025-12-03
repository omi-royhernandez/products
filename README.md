### Requirements
- Python 3.10+
- Node.js / npm
- PostgreSQL database
- Poetry

### Local Development
#### Frontend
- run `npm install`
- run `npm run dev` to start the server
- set .env file var `VITE_BACKEND_URL` to your backend api url `(e.g.: http://127.0.0.1:{PORT_NUMBER})`

#### Backend
- first install python, poetry, and postgres.
- create the database, run `psql postgres -U postgres`
- run `CREATE DATABASE {db_name};`
- create and set .env file var `DATABASE_URL` to your postgres database url. `(e.g.: postgresql+asyncpg://{user}:{password}@localhost:5432/db_name)`
- activate poetry environment `$(poetry env activate)`
- run `poetry install --no-root` to install dependencies
- run `alembic upgrade head` for creating tables and migrations
- start the backend server `uvicorn main:app --reload`

### Live Links
- Backend: (https://products-3jik.onrender.com)[https://products-3jik.onrender.com]
- Frontend: (https://rsah-products.netlify.app/)[https://rsah-products.netlify.app/]
- Postgres: Feel free to email me at rsah.engr@gmail.com for the live link of the postgres database
