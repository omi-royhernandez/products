
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi import Depends
from typing import AsyncGenerator
from settings import settings

engine = create_async_engine(settings.DATABASE_URL)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for getting async database session.

    Yields:
        AsyncSession: Async database session
    """
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()

db_dependency: AsyncSession = Depends(get_session)