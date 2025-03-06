import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    // Parse the search query from the URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    console.log("Query: ", query);

    if (!query) {
      // Fetch all companies (excluding embeddings)
      const { data, error } = await supabase
        .from("companies")
        .select("id, name, description, industry, country");

      if (error) throw error;

      return NextResponse.json({ data }, { status: 200 });
    }

    // Step 1: Generate the embedding for the user query using Supabase AI
    const { data: embeddingData, error: embeddingError } =
      await supabase.functions.invoke("generate-embedding", {
        body: { input: query },
      });

    if (embeddingError) throw embeddingError;

    const queryEmbedding = embeddingData.embedding;

    // Step 2: Perform a vector similarity search in Supabase
    const { data, error } = await supabase.rpc("search_companies", {
      search_embedding: queryEmbedding,
      match_count: 5, // Retrieve top 5 matches
      min_similarity: 0.7, // Ignore low similarity results
    });

    if (error) throw error;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
