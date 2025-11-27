import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import EditModal from "./components/EditModal";
import { ClipLoader } from "react-spinners";
import type { ProductBase } from "./types";
import { AiFillPlusCircle } from "react-icons/ai";
import CreateModal from "./components/CreateModal";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [products, setProducts] = useState<ProductBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductBase | null>(
    null,
  );
  const [createModal, setCreateModal] = useState<boolean>(false);

  const loadProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product: ProductBase) => {
    setEditingProduct(product);
  };

  const handleCreate = async (newProduct: ProductBase) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        return;
      }
      const createdProduct = await response.json();
      setProducts((prev) => [createdProduct, ...prev]);
    } catch (error) {
      console.error(error);
    } finally {
      setCreateModal(false);
      loadProducts();
    }
  };
  const handleSave = async (updatedProduct: ProductBase) => {
    try {
      const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) {
        return;
      }

      setProducts((prev) =>
        prev.map((p) => (p.name === updatedProduct.name ? updatedProduct : p)),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setEditingProduct(null);
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 p-4">
      <button
        onClick={() => {
          setCreateModal(true);
        }}
        className="mb-4 flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-medium text-black shadow transition-colors duration-200 hover:bg-green-600"
      >
        <AiFillPlusCircle size={20} />
        <span>Create Product</span>
      </button>
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <ClipLoader size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              {...product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {editingProduct && (
        <EditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSave}
        />
      )}

      {createModal && (
        <CreateModal
          onClose={() => setCreateModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

export default App;
