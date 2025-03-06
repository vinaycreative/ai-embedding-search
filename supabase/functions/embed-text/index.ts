import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

// Initialize Supabase AI Session using the built-in model
const session = new Supabase.ai.Session("gte-small");

serve(async (req) => {
  try {
    const { text } = await req.json();

    // Generate embedding for the given text
    const embedding = await session.run(text, {
      mean_pool: true,
      normalize: true,
    });

    return new Response(JSON.stringify({ embedding }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
