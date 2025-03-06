import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SURL = process.env.NEXT_PUBLIC_SUPABSE2URL!;
const SSECRET = process.env.NEXT_PUBLIC_SUPABSE2SECRET!;

const supabase = createClient(SURL, SSECRET);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      const { data, error } = await supabase
        .from("companies")
        .select("id, name, description, industry, country");

      if (error) throw error;

      return NextResponse.json({ data }, { status: 200 });
    }

    // Generate embedding for the search query using OpenAI
    const { data: embeddingData, error: embeddingError } =
      await supabase.functions.invoke("openai-embedding-function", {
        body: { input: query },
      });

    if (embeddingError) throw embeddingError;

    const queryEmbedding = embeddingData.embedding;

    // Perform vector similarity search using OpenAI embeddings (1536)
    const { data, error } = await supabase.rpc("search_companies", {
      search_embedding: queryEmbedding,
      match_count: 5,
      min_similarity: 0.7,
    });

    if (error) throw error;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
