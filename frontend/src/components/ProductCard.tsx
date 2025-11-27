import React, { useState } from "react";
import type { ProductBase } from "../types";
import { ClipLoader } from "react-spinners";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

interface ProductCardProps extends ProductBase {
  onEdit: (product: ProductBase) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  img,
  id,
  onEdit,
  onDelete,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="flex w-[350px] flex-col items-center rounded-lg bg-white p-3 shadow-lg">
      <div className="relative h-[280px] w-full overflow-hidden rounded-lg bg-gray-200">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ClipLoader />
          </div>
        )}
        <img
          src={img}
          alt={name}
          className={`h-full w-full rounded-lg object-cover transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <div className="mt-3 flex w-full flex-col space-y-2">
        <span className="text-lg font-semibold text-black">{name}</span>
        {description && (
          <p className="line-clamp-2 text-sm text-gray-600">{description}</p>
        )}

        <div className="flex items-center justify-between rounded-lg py-1">
          <span className="text-md font-bold text-black">₱{price}</span>
          <div>
            <button
              onClick={() => onEdit({ name, price, description, img, id })}
              className="rounded p-1 transition-colors hover:bg-green-400"
            >
              <AiFillEdit className="text-black" size={20} />
            </button>
            <button onClick={() => onDelete(id)} className="rounded p-1 transition-colors hover:bg-green-400">
              <AiFillDelete className="text-black" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
