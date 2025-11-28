import React from "react";
import type { Product } from "../types";

interface EditModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const EditModal: React.FC<EditModalProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Product>({ ...product });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Edit Product</h2>
        <label className="text-black">Name</label>
        <input
          type="text"
          className="mb-2 w-full rounded border border-black p-2 text-black"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <label className="text-black">Price</label>
        <input
          type="number"
          className="mb-2 w-full rounded border border-black p-2 text-black"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={(e) =>
            handleChange(e.target.name, parseFloat(e.target.value))
          }
        />
        <label className="text-black">Description</label>
        <input
          type="text"
          className="mb-2 w-full rounded border border-black p-2 text-black"
          placeholder="Description"
          name="description"
          value={formData.description || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <label className="text-black">Image</label>
        <input
          type="text"
          className="mb-2 w-full rounded border border-black p-2 text-black"
          placeholder="Image URL"
          value={formData.img}
          name="img"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            onClick={() => onSave(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
