"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
export default function CreateProduct() {
  const [media, setMedia] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState("");
  const [product_name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [off, setOff] = useState(false);
  const [offPrice, setOffPrice] = useState(0);
  const [code, setCode] = useState("");
  const [productType, setProductType] = useState("");

  // Load all Supabase images
  useEffect(() => {
    fetch("/admin/api/media/list")
      .then((res) => res.json())
      .then((data) => setMedia(data.images));
  }, []);

  const handleSubmit = async () => {
    if (
      !product_name ||
      !category ||
      !selectedImage ||
      !description ||
      quantity <= 0 ||
      price <= 0 ||
      !tags
    ) {
      return alert("Please fill required fields!");
    }

    const res = await fetch("/admin/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name,
        description,
        category,
        quantity,
        price,
        off,
        off_price: offPrice,
        code,
        product_type: productType,
        image_url: selectedImage,
        tags: tags,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Product created successfully!");

      // Clear form
      setProductName("");
      setDescription("");
      setCategory("");
      setQuantity(0);
      setPrice(0);
      setOff(false);
      setOffPrice(0);
      setCode("");
      setProductType("");
      setSelectedImage("");
      setTags("");
    } else {
      alert(data.error || "Something went wrong!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 text-white">Create Product</h1>

      {/* Choose Image */}
      <button
        className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        onClick={() => setOpen(true)}
      >
        Choose Product Image
      </button>

      {selectedImage && (
        <div className="mt-4 ">
          <p>Selected Image:</p>
          <img src={selectedImage} className="w-40 rounded-lg" />
        </div>
      )}

      {/* Image Picker Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-xl w-[600px] h-[400px] overflow-auto">
            <h2 className="text-xl mb-4">Select an Image</h2>

            <div className="grid grid-cols-3 gap-3">
              {media.map((img) => (
                <div
                  key={img.name}
                  className="cursor-pointer   rounded-lg hover:opacity-80"
                  onClick={() => {
                    setSelectedImage(img.url);
                    setOpen(false);
                  }}
                >
                  <img
                    src={img.url}
                    className="w-full h-[120px] object-contain rounded-lg"
                  />
                  <p className="text-black text-center">
                    {img.name.length > 10
                      ? img.name.slice(0, 10) + "..."
                      : img.name}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Product Form */}
      <div className="mt-4 grid grid-cols-2 gap-4 ">
        <div className="flex flex-col items-start ">
          <label htmlFor="off" className="font-lg text-[18px]  text-center">
            Product Name :{" "}
          </label>
          <input
            type="text"
            placeholder="Product Name"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>
        <div className="flex flex-col items-start ">
          <label htmlFor="off" className="font-lg text-[18px]  text-center">
            Category :{" "}
          </label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>
        <div className="flex flex-col items-start ">
          <label htmlFor="off" className="font-lg text-[18px]  text-center">
            description :{" "}
          </label>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>
        <div className="flex flex-col items-start ">
          <label htmlFor="off" className="font-lg text-[18px]  text-center">
            Quantity :{" "}
          </label>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            min={0}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>
        <div className="flex flex-col items-start ">
          <label htmlFor="off" className="font-lg text-[18px]  text-center">
            Price :{" "}
          </label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            min={0}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>
        <div className="flex items-center ">
          <label htmlFor="off" className="font-lg text-[18px]  text-center">
            Discount :{" "}
          </label>
          <input
            type="checkbox"
            checked={off}
            id="off"
            onChange={(e) => setOff(e.target.checked)}
            className="mb-1 ml-2 w-5 h-5 "
          />
        </div>
        {off && (
          <div className="flex flex-col items-start ">
            <label htmlFor="off" className="font-lg text-[18px]  text-center">
              Discount Price :{" "}
            </label>
            <input
              type="number"
              placeholder="Off Price"
              min={0}
              value={offPrice}
              onChange={(e) => setOffPrice(Number(e.target.value))}
              className="w-full p-3 border rounded-lg text-black"
            />
          </div>
        )}

        <div className="flex flex-col items-start ">
          <label htmlFor="off" className="font-lg text-[18px]  text-center">
            Product Type :{" "}
          </label>
          <input
            type="text"
            placeholder="Product Type"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>
        <div className="flex flex-col items-start ">
          <label className="font-lg text-[18px]  text-center">Tags : </label>
          <input
            type="text"
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg"
        onClick={handleSubmit}
      >
        Save Product
      </button>
      <button
        onClick={() => {
          redirect("/admin/products");
        }}
        className=" mt-8 px-6 py-3 ml-2 bg-white text-green-600 rounded-lg"
      >
        Cancel
      </button>
    </div>
  );
}
