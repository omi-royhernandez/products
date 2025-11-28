export type ProductBase = {
  name: string;
  price: number;
  description: string;
  img: string;
}

export type Product = ProductBase & {
  id: number
}