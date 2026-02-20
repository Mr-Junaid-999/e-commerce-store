"use client";

import { useState, useEffect } from "react";

export default function MediaUploadPage() {
  const [url, setUrl] = useState("");
  const [media, setMedia] = useState([]); // <-- store all uploaded images

  // Fetch all uploaded images from Supabase on page load
  const fetchMedia = async () => {
    try {
      const res = await fetch("/admin/api/media/list");
      const data = await res.json();
      if (data.images) setMedia(data.images);
    } catch (error) {
      console.error("Failed to fetch media:", error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Upload new file
  const handleUpload = async (e) => {
    e.preventDefault();

    const file = e.target.file.files[0];
    if (!file) return alert("Choose a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/admin/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setUrl(data.url);

        // Refresh media list after upload
        fetchMedia();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Media Upload</h1>

      <form onSubmit={handleUpload}>
        <input type="file" name="file" className="mb-4" />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Upload
        </button>
      </form>

      {url && (
        <div className="mt-4">
          <p>Last Uploaded Image:</p>
          <img src={url} className="w-40 rounded-lg" />
        </div>
      )}

      {/* Show all uploaded images */}
      <div className="mt-6">
        <h2 className="text-xl mb-3 text-white">All Uploaded Images</h2>
        <div className="grid grid-cols-4 gap-4">
          {media.map((img) => (
            <div key={img.name} className="border p-2 rounded-lg">
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-40 object-contain rounded-lg"
              />
              <p className="text-sm mt-1 text-white truncate">{img.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
