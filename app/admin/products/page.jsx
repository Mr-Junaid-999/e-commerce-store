"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/admin/components/ui/card";
import createClient from "@/lib/client";
import Link from "next/link";
import Image from "next/image";

export default function ProductsPage() {
  const supabase = createClient();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);

      // Supabase returns { data, error }
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        setError(error.message);
        return;
      }

      // Store only the data array, not the entire response
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    try {
      console.log("Deleting product with id:", id);
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      // Update local state
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  // Save edits
  const saveProduct = async (id) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(editData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      await fetchProducts(); // 🔥 important
      setEditingId(null);
      setEditData({});
    } catch (error) {
      alert("Failed to save product");
    }
  };

  // Handle edit input changes
  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Filter products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(
      products.map((p) => p.category).filter(Boolean) // Remove null/undefined
    ),
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <Link
          href="/admin/products/create"
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-sm text-black font-medium"
        >
          + Add Product
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 p-4 rounded-lg">
          <h3 className="font-bold">Error</h3>
          <p>{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-2 px-3 py-1 bg-red-700 hover:bg-red-800 rounded text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
          <p className="text-gray-300 mt-2">Loading products...</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#1E293B] p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-white mt-1">
                {products.length}
              </p>
            </div>
            <div className="bg-[#1E293B] p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Categories</p>
              <p className="text-2xl font-bold text-white mt-1">
                {categories.length - 1}
              </p>
            </div>
            <div className="bg-[#1E293B] p-4 rounded-lg">
              <p className="text-gray-400 text-sm">In Stock</p>
              <p className="text-2xl font-bold text-white mt-1">
                {
                  products.filter((p) => (p.quantity || p.stock_quantity) > 0)
                    .length
                }
              </p>
            </div>
          </div>

          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    selectedCategory === cat
                      ? "bg-yellow-500 text-[#1E293B]"
                      : "bg-[#1E293B] text-gray-300 hover:bg-[#2E3A52]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Products Table */}
          <Card className="bg-[#161B22] border border-gray-700">
            <CardContent className="p-0">
              {/* Scroll Container */}
              <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 scroll-auto">
                    {products.length === 0
                      ? "No products found"
                      : "No products in this category"}
                  </div>
                ) : (
                  <table className="w-full text-left border-separate border-spacing-y-3 ">
                    <thead className="text-gray-400 text-sm">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Image</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">OFF Price</th>
                        <th className="p-3">Tags</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="bg-[#1E293B] overflow-hidden rounded-xl mb-3"
                        >
                          {/* Editable row */}
                          {editingId === product.id ? (
                            <>
                              <td className="p-3">
                                <input
                                  type="text"
                                  value={editData.product_name ?? ""}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "product_name",
                                      e.target.value
                                    )
                                  }
                                  className="bg-[#0F172A] text-white p-2 rounded w-full"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="text"
                                  defaultValue={product.category}
                                  onChange={(e) =>
                                    handleEditChange("category", e.target.value)
                                  }
                                  className="bg-[#0F172A] text-white p-2 rounded w-full"
                                />
                              </td>
                              <td className="p-3">
                                <textarea
                                  defaultValue={product.description}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  className="bg-[#0F172A] text-white p-2 rounded w-full"
                                  rows="2"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="text"
                                  defaultValue={
                                    product.image || product.image_url
                                  }
                                  onChange={(e) =>
                                    handleEditChange("image", e.target.value)
                                  }
                                  className="bg-[#0F172A] text-white p-2 rounded w-full"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  defaultValue={product.quantity}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "quantity",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="bg-[#0F172A] text-white p-2 rounded w-20"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  step="0.01"
                                  defaultValue={product.price}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "price",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="bg-[#0F172A] text-white p-2 rounded w-24"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  step="0.01"
                                  defaultValue={
                                    product.off_price ? product.off_price : 0
                                  }
                                  onChange={(e) =>
                                    handleEditChange(
                                      "off_price",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="bg-[#0F172A] text-white p-2 rounded w-24"
                                />
                              </td>
                              <td className="p-3">
                                <input
                                  type="text"
                                  defaultValue={product.tags}
                                  onChange={(e) =>
                                    handleEditChange("tags", e.target.value)
                                  }
                                  className="bg-[#0F172A] text-white p-2 rounded w-full"
                                />
                              </td>
                              <td className="p-3 flex gap-2 mt-6">
                                <button
                                  onClick={() => saveProduct(product.id)}
                                  className="px-3 py-1 bg-green-600 rounded text-sm hover:bg-green-700"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditData({});
                                  }}
                                  className="px-3 py-1 bg-gray-600 rounded text-sm hover:bg-gray-700"
                                >
                                  Cancel
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="p-3 font-medium text-white">
                                {product.product_name}
                              </td>
                              <td className="p-3 text-gray-300">
                                {product.category || "Uncategorized"}
                              </td>
                              <td className="p-3 text-gray-400 max-w-xs">
                                <div className="truncate">
                                  {product.description || "No description"}
                                </div>
                              </td>
                              <td className="p-3">
                                <Image
                                  width={36}
                                  height={36}
                                  src={product.image || product.image_url}
                                  alt={product.product_name}
                                  className="w-auto h-auto object-cover rounded"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/50";
                                  }}
                                />
                              </td>
                              <td className="p-3 text-gray-300">
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    (product.quantity ||
                                      product.stock_quantity) > 0
                                      ? "bg-green-900 text-green-300"
                                      : "bg-red-900 text-red-300"
                                  }`}
                                >
                                  {product.quantity ||
                                    product.stock_quantity ||
                                    0}
                                </span>
                              </td>
                              <td className="p-3 text-white font-medium">
                                ${parseFloat(product.price || 0).toFixed(2)}
                              </td>
                              <td className="p-3 text-white font-medium">
                                ${parseFloat(product.off_price || 0).toFixed(2)}
                              </td>
                              <td className="p-3 text-gray-300">
                                {product.tags}
                              </td>
                              <td className="p-3   mt-3  ">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingId(product.id);
                                      setEditData({
                                        product_name: product.product_name,
                                        category: product.category,
                                        description: product.description,
                                        image:
                                          product.image || product.image_url,
                                        quantity:
                                          product.quantity ||
                                          product.stock_quantity,
                                        price: product.price,
                                        tags: product.tags,
                                      });
                                    }}
                                    className="px-3 py-1 bg-yellow-500 text-black rounded text-sm font-medium hover:bg-yellow-600"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (
                                        confirm(
                                          "Are you sure you want to delete this product?"
                                        )
                                      ) {
                                        deleteProduct(product.id);
                                      }
                                    }}
                                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Refresh Button */}
          <div className="flex justify-end">
            <button
              onClick={fetchProducts}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 font-medium flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Products
            </button>
          </div>
        </>
      )}
    </div>
  );
}
