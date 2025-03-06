import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export const metadata = {
  title: "AI Search Comparison: Supabase vs. OpenAI – Find the Best Results",
  description:
    "Compare AI-powered search performance between Supabase (gte-small, 384D embeddings) and OpenAI (text-embedding-ada-002, 1536D embeddings). Test natural language queries and analyze search accuracy.",
};

export default function Home() {
  return (
    <main className="w-full h-dvh grid grid-cols-2 overflow-hidden">
      {/* Left */}
      <div className="h-full flex flex-col border border-gray-200 overflow-hidden">
        <div className="min-h-[80px] px-4 flex items-center justify-center flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">Supabase</h1>
            <p className="font-medium text-sm text-gray-700">
              AI Search (384-Dimensional Embeddings)
            </p>
          </div>
          <p className="text-sm text-gray-600">
            built-in <b className="text-green-600">gte-small</b> model, this
            search uses 384-dimensional embeddings to find relevant results.
          </p>
        </div>

        {/* Data */}
        <SearchBar api="companies" />
      </div>

      {/* Right */}
      <div className="h-full flex flex-col border border-gray-200 overflow-hidden">
        <div className="min-h-[80px] px-4 flex items-center justify-center flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">OpenAI</h1>
            <p className="font-medium text-sm text-gray-700">
              AI Search (1536-Dimensional Embeddings)
            </p>
          </div>
          <p className="text-sm text-center text-gray-600">
            Using OpenAI’s{" "}
            <b className="text-blue-600">text-embedding-ada-002</b> model, this
            search leverages 1536-dimensional embeddings for enhanced accuracy
          </p>
        </div>

        {/* Data */}
        <SearchBar api="companies-with-openai" />
      </div>
    </main>
  );
}
