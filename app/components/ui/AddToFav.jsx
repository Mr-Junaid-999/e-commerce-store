"use client";
import { useState, useEffect } from "react";
import createClient from "@/lib/client";

export default function AddToFav({ productid }) {
  const supabase = createClient();

  const [favoriteIds, setFavoriteIds] = useState([]);

  // 🔥 load favorites on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return setFavoriteIds([]);

      const { data } = await supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", user.id);

      setFavoriteIds(data?.map((f) => f.product_id) || []);
    };
    fetchFavorites();
  }, []);

  const addToFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return alert("Login required");

    const { error } = await supabase.from("favorites").insert({
      user_id: user.id,
      product_id: productid,
    });

    if (!error) {
      setFavoriteIds((prev) => [...prev, productid]); // ✅ UI update
    }
  };

  const removeFromFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productid);

    setFavoriteIds((prev) => prev.filter((id) => id !== productid)); // ✅ UI update
  };

  const isFav = favoriteIds.includes(productid);

  return (
    <button
      onClick={isFav ? removeFromFavorite : addToFavorite}
      className="text-2xl"
    >
      {isFav ? "❤️" : "🤍"}
    </button>
  );
}
