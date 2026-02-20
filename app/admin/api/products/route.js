import { supabaseAdmin } from "@/lib/supabase-admin";
import { v4 as uuidv4 } from "uuid";

// Function to generate product code
function generateProductCode() {
  // Generate shortened UUID (12 chars)
  const code = uuidv4().replace(/-/g, "").slice(0, 12).toUpperCase();
  return code; // Returns String
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      product_name,
      description,
      category,
      quantity,
      price,
      off,
      off_price,
      product_type,
      image_url,
      tags,
    } = body;
    const code = generateProductCode();

    const { data, error } = await supabaseAdmin()
      .from("products")
      .insert([
        {
          product_name,
          description: description,
          category,
          quantity,
          price,
          code,
          off,
          off_price,
          code,
          product_type,
          image: image_url,
          created_at: new Date().toISOString(),
          tags,
        },
      ]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ product: data }), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }
}
