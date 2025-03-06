import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const POST = async () => {
  try {
    const companies = [
      {
        name: "Company A",
        description:
          "Supplier of electric door drives for the lift and mechanical engineering industry",
        industry: "Mechanical Engineering",
        country: "Germany",
      },
      {
        name: "Company B",
        description:
          "Non-bookable content for customers in the tourism industry",
        industry: "Tourism",
        country: "France",
      },
      {
        name: "Company C",
        description: "Biotech firm working on innovative cancer treatments",
        industry: "Pharmaceuticals",
        country: "USA",
      },
      {
        name: "Company D",
        description:
          "Technology startup focused on AI-powered business analytics",
        industry: "Technology",
        country: "India",
      },
      {
        name: "Company E",
        description:
          "Renewable energy company specializing in solar panel manufacturing",
        industry: "Renewable Energy",
        country: "Spain",
      },
      {
        name: "Company F",
        description: "E-commerce platform for organic and sustainable products",
        industry: "E-commerce",
        country: "UK",
      },
      {
        name: "Company G",
        description: "Fintech company providing AI-driven investment solutions",
        industry: "Fintech",
        country: "Singapore",
      },
      {
        name: "Company H",
        description:
          "Automobile company manufacturing electric and hybrid vehicles",
        industry: "Automobile",
        country: "Japan",
      },
      {
        name: "Company I",
        description:
          "Healthcare provider specializing in telemedicine solutions",
        industry: "Healthcare",
        country: "Canada",
      },
      {
        name: "Company J",
        description:
          "Cybersecurity firm offering advanced threat detection solutions",
        industry: "Cybersecurity",
        country: "USA",
      },
    ];

    // Loop through each company
    let companiesWithEmbeddings = [];

    // Loop through each company to generate embeddings
    for (const company of companies) {
      const { name, description, industry, country } = company;

      // Call Supabase Edge Function to generate an embedding
      const { data: embeddingData, error: embeddingError } =
        await supabase.functions.invoke("generate-embedding", {
          body: { input: description },
        });

      if (embeddingError) throw embeddingError;

      // Store company data with embedding
      companiesWithEmbeddings.push({
        name,
        description,
        industry,
        country,
        embedding: embeddingData.embedding,
      });
    }

    // Insert all companies into Supabase in a single batch operation
    const { data, error } = await supabase
      .from("companies")
      .insert(companiesWithEmbeddings);

    if (error) throw error;

    return NextResponse.json({
      message: "Companies added successfully!",
      data,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
