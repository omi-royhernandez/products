from sqlalchemy import  Column, Integer, String, Float
  
from database import Base

class Product(Base):
  __tablename__ = "products"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, index=True, nullable=False)
  description = Column(String)
  price = Column(Float, nullable=False)
  img = Column(
        String,
        nullable=False,
        server_default="https://picsum.photos/350/280"
    )

