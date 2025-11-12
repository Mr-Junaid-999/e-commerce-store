"use client";
import { useState } from "react";
import { Card, CardContent } from "@/app/admin/components/ui/card";

export default function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Nike Shoes",
      category: "Footwear",
      quantity: 25,
      price: "$80",
      description: "Comfortable running shoes",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "T-shirt",
      category: "Clothing",
      quantity: 40,
      price: "$25",
      description: "Cotton round-neck t-shirt",
      image: "https://via.placeholder.com/50",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);

  // Add product
  const addProduct = () => {
    const name = prompt("Enter product name:");
    const category = prompt("Enter category:");
    const quantity = prompt("Enter quantity:");
    const price = prompt("Enter price:");
    const description = prompt("Enter description:");
    const image = prompt("Enter image URL:");
    if (name)
      setProducts([
        ...products,
        {
          id: Date.now(),
          name,
          category,
          quantity,
          price,
          description,
          image,
        },
      ]);
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Save edits
  const saveProduct = (id, updated) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    setEditingId(null);
  };

  // Filter products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={addProduct}
          className="bg-yellow-400 hover:bg-yellow-600 px-4 py-2 rounded-lg text-sm"
        >
          + Add Product
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Table */}
      <Card className="bg-[#161B22]">
        <CardContent>
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead className="text-gray-400 text-sm">
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className="bg-[#1E293B] overflow-hidden rounded-xl  mb-3"
                >
                  {/* Editable row */}
                  {editingId === p.id ? (
                    <>
                      <td className="p-2">
                        <input
                          type="text"
                          defaultValue={p.name}
                          className="bg-[#0F172A] text-white p-1 rounded w-full"
                          onChange={(e) => (p.name = e.target.value)}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          defaultValue={p.category}
                          className="bg-[#0F172A] text-white p-1 rounded w-full"
                          onChange={(e) => (p.category = e.target.value)}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          defaultValue={p.description}
                          className="bg-[#0F172A] text-white p-1 rounded w-full"
                          onChange={(e) => (p.description = e.target.value)}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          defaultValue={p.image}
                          className="bg-[#0F172A] text-white p-1 rounded w-full"
                          onChange={(e) => (p.image = e.target.value)}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          defaultValue={p.quantity}
                          className="bg-[#0F172A] text-white p-1 rounded w-full"
                          onChange={(e) => (p.quantity = e.target.value)}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          defaultValue={p.price}
                          className="bg-[#0F172A] text-white p-1 rounded w-full"
                          onChange={(e) => (p.price = e.target.value)}
                        />
                      </td>
                      <td className="p-2 flex gap-2">
                        <button
                          onClick={() =>
                            saveProduct(p.id, {
                              name: p.name,
                              category: p.category,
                              description: p.description,
                              image: p.image,
                              quantity: p.quantity,
                              price: p.price,
                            })
                          }
                          className="px-2 py-1 bg-green-600 rounded text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2 py-1 bg-gray-600 rounded text-sm"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 ">{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.description}</td>
                      <td>
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td>{p.quantity}</td>
                      <td>{p.price}</td>
                      <td className="flex gap-2 p-3">
                        <button
                          onClick={() => setEditingId(p.id)}
                          className="px-2 py-1 bg-yellow-400 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="px-2 py-1 bg-red-600 rounded text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
