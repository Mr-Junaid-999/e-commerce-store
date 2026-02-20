import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin()
    .storage.from("media")
    .list("", { limit: 100 });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/media/";

  const images = data.map((file) => ({
    name: file.name,
    url: baseUrl + file.name,
  }));

  return Response.json({ images });
}
