import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req) {
  console.log("file");
  const supabase = supabaseAdmin();
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    console.log("file", file);

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    // Upload
    const { error } = await supabase.storage
      .from("media")
      .upload(fileName, buffer, {
        contentType: file.type,
      });

    if (error) {
      console.log(error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    // Public URL
    const { data: urlData } = supabase.storage
      .from("media")
      .getPublicUrl(fileName);

    return Response.json({ url: urlData.publicUrl });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
