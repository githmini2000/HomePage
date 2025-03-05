"use client";

import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    rating: 0,
  });

  const pageSize = 10;

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      let allProducts: any[] = [];
      let page = 1;
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await fetch(
          `http://localhost:3001/items?section=featuredItems&page=${page}&size=${pageSize}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch page ${page}`);
        }

        const data = await response.json();

        if (data.length === 0) {
          hasMoreData = false;
        } else {
          allProducts = [...allProducts, ...data];
          page++;
        }
      }

      setFeaturedItems(allProducts);
    } catch (error) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open Form for Adding a New Product
  const handleAddNew = () => {
    setFormData({
      title: "",
      price: "",
      description: "",
      image: "",
      rating: 0,
    });
    setEditMode(false);
    setShowForm(true);
  };

  // Open Form for Editing an Existing Product
  const handleEdit = (product: any) => {
    setFormData({ ...product });
    setSelectedProduct(product);
    setEditMode(true);
    setShowForm(true);
  };

  // Handle Form Submission (Add or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `http://localhost:3001/items/featuredItems/${selectedProduct.id}`
      : "http://localhost:3001/items/featuredItems";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      fetchAllProducts();
      setShowForm(false);
    }
  };

  // Handle Product Deletion
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    const response = await fetch(
      `http://localhost:3001/items/featuredItems/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      fetchAllProducts();
    }
  };

  if (loading)
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Products</h1>
      <button
        onClick={handleAddNew}
        className="mb-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-blue-700"
      >
        + Add New Product
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredItems.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition duration-300"
          >
            <div className="w-full h-56 overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-4 w-full flex justify-between border-b border-gray-300 pb-2">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <span className="text-black font-bold">
                LKR {product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-gray-600 mt-2 text-left">
              {product.description}
            </p>

            <div className="flex justify-start mt-2">
              {[...Array(product.rating)].map((_, i) => (
                <span key={i} className="text-green-800 text-lg">
                  ★
                </span>
              ))}
            </div>

            <div className="flex mt-4 space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="mt-4 bg-white border-4 border-green-900 text-green-900 font-bold px-4 py-1 rounded-sm hover:bg-green-500 hover:text-white transition self-start"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-4 bg-white border-4 border-red-900 text-red-900 font-bold px-4 py-1 rounded-sm hover:bg-green-500 hover:text-white transition self-start"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold">
              {editMode ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                required
                value={formData.image}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                min="0"
                max="5"
                required
                value={formData.rating}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {editMode ? "Update Product" : "Add Product"}
              </button>
            </form>
            <button
              onClick={() => setShowForm(false)}
              className="mt-2 text-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;


/*
import { useEffect, useState } from "react";
import ProductList from "./productList";
import ProductForm from "./productForm";

const ProductsPage = () => {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({ title: "", price: "", description: "", image: "", rating: 0 });

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/items?section=featuredItems");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setFeaturedItems(data);
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Handle Form Submission (Add or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `http://localhost:3001/items/${selectedProduct.id}`
      : "http://localhost:3001/items";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      fetchAllProducts();
      setShowForm(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    const response = await fetch(`http://localhost:3001/items/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchAllProducts();
    }
  };

  if (loading) return <div className="text-center text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Products</h1>
      <button
        onClick={() => { setShowForm(true); setEditMode(false); }}
        className="mb-4 px-4 py-2 bg-green-900 text-white rounded-lg"
      >
        + Add New Product
      </button>

      <ProductList
        products={featuredItems}
        onEdit={(product) => { setSelectedProduct(product); setEditMode(true); setShowForm(true); }}
        fetchAllProducts={fetchAllProducts}
        onDelete={handleDelete}
      />

      {showForm && <ProductForm {...{ formData, setFormData, editMode, selectedProduct, fetchAllProducts, setShowForm }} />}
    </div>
  );
};

export default ProductsPage;
*/