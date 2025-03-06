////Handles adding/editing products
"use client";

import { useState } from "react";

interface ProductFormProps {
  initialData: any;
  onSubmit: (formData: any, editMode: boolean) => void;
  onCancel: () => void;
  editMode: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  editMode,
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, editMode);
  };

  return (
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
        <button onClick={onCancel} className="mt-2 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
