"use client";

import { useEffect, useState } from "react";
import ProductList from "./productList";
import ProductForm from "./productForm";

const ProductsPage = () => {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const pageSize = 10;

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
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
        if (!response.ok) throw new Error(`Failed to fetch page ${page}`);
        const data = await response.json();
        if (data.length === 0) hasMoreData = false;
        else {
          const formattedProducts = data.map((product: any) => ({
            ...product,
            category: product.category
              ? product.category
              : { id: "", name: "" },
          }));
          allProducts = [...allProducts, ...formattedProducts];
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

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/category");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {}
  };

  const handleAddNew = () => {
    setSelectedProduct({
      title: "",
      price: "",
      description: "",
      image: "",
      rating: 0,
      category: "",
    });
    setEditMode(false);
    setShowForm(true);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    const response = await fetch(
      `http://localhost:3001/items/featuredItems/${id}`,
      { method: "DELETE" }
    );
    if (response.ok) fetchAllProducts();
  };

  const handleSubmit = async (formData: any, editMode: boolean) => {
    if (!formData.category || !formData.category.id) {
      alert("Invalid category selected.");
      return;
    }

    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `http://localhost:3001/items/featuredItems/${selectedProduct.id}`
      : "http://localhost:3001/items/featuredItems";

    const requestBody = {
      ...formData,
      category_id: formData.category.id,
    };

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      fetchAllProducts();
      setShowForm(false);
    } else {
      console.error("Failed to submit form");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Products</h1>
      <button
        onClick={handleAddNew}
        className="mb-4 px-4 py-2 bg-green-900 text-white rounded-lg"
      >
        + Add New Product
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductList
          products={featuredItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {showForm && (
        <ProductForm
          initialData={selectedProduct}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          editMode={editMode}
          categories={categories}
        />
      )}
    </div>
  );
};

export default ProductsPage;
