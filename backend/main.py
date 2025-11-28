from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware

from database import db_dependency
from model import Product
from schema import ProductCreate, ProductUpdate
from enums import ResponseStatusEnum


from sqlalchemy import select

app = FastAPI()

origins = [
  "http://localhost:5173",
  "https://rsah-products.netlify.app/",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
async def get_products(session = db_dependency):
  query = select(Product)
  result = await session.execute(query)
  products = result.scalars().all()
  
  return products

@app.post("/")
async def create_product(body: ProductCreate, session = db_dependency):
  try: 
    new_product = Product(
      name = body.name,
      description = body.description,
      price = body.price,
      img = body.img
    )

    session.add(new_product)
    await session.commit()

    return {
      "msg": "Product Created Successfully!",
      "status": ResponseStatusEnum.SUCCESS
    }
  except:
    return {
      "msg": "Product Create Failed!",
      "status": ResponseStatusEnum.SUCCESS
    }

@app.put("/{id}")
async def update_product(id: int, body: ProductUpdate, response: Response, session = db_dependency):
  try: 
    existing_product = await session.get(Product, id)
    print(f"TEST {existing_product}")
    if not existing_product:
      raise HTTPException(status_code=404, detail="Product not found")

    existing_product.name = body.name
    existing_product.price = body.price
    if body.description:
      existing_product.description = body.description
    if body.img:
      existing_product.img = body.img
    

    await session.commit()

    return {
      "msg": "Product Updated Successfully!",
      "status": ResponseStatusEnum.SUCCESS
    }
  except HTTPException:
    raise
  except Exception as e:
    response.status_code = e.status_code
    return {
      "msg": "Product Update Failed!",
      "error": str(e.detail),
      "status": ResponseStatusEnum.SUCCESS
    }
  
@app.delete("/{id}")
async def delete_product(id: int, response: Response, session = db_dependency):
  try:
    existing_product = await session.get(Product, id)

    if not existing_product:
      raise HTTPException(status_code=404, detail="Product not found")
    
    await session.delete(existing_product)
    await session.commit()

    return {
      "msg": "Product Deleted Successfully!",
      "status": ResponseStatusEnum.SUCCESS
    }
  
  except Exception as e:
    response.status_code = e.status_code
    return {
      "msg": "Product Delete Failed!",
      "error": str(e.detail),
      "status": ResponseStatusEnum.FAILED
    }
