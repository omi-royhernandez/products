from logging.config import fileConfig
from sqlalchemy import pool
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
from alembic import context

from database import Base  # your SQLAlchemy Base
from model import Product  # import all models so metadata is registered

from settings import settings

# Alembic Config object
config = context.config

# Setup logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Autogenerate support
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = settings.DATABASE_URL
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Run migrations in 'online' mode using AsyncEngine."""
    connectable = create_async_engine(
        settings.DATABASE_URL,
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def do_run_migrations(connection):
    """Wrap synchronous migration logic."""
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    import asyncio

    asyncio.run(run_migrations_online())
