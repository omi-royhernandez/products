import React from "react";
import type { ProductBase } from "../types";

interface CreateModalProps {
  onClose: () => void;
  onCreate: (newProduct: ProductBase) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose, onCreate }) => {
  const [formData, setFormData] = React.useState<ProductBase>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    img: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Create Product</h2>
          <label className="text-black">Name</label>
        <input
          type="text"
          className="border border-black text-black p-2 w-full mb-2 rounded"
          placeholder="Name"
          value={formData.name}
          name="name"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <label className="text-black">Price</label>
        <input
          type="number"
          className="border border-black text-black p-2 w-full mb-2 rounded"
          placeholder="Price"
          value={formData.price}
          name="price"
          onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}
        />
        <label className="text-black">Description</label>
        <input
          type="text"
          className="border border-black text-black p-2 w-full mb-2 rounded"
          placeholder="Description"
          name="description"
          value={formData.description || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <label className="text-black">Image</label>
        <input
          type="text"
          className="border border-black text-black p-2 w-full mb-2 rounded"
          placeholder="Image URL"
          value={formData.img}
          name="img"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => onCreate(formData)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
