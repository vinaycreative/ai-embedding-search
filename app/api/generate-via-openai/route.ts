import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SURL = process.env.NEXT_PUBLIC_SUPABSE2URL!;
const SSECRET = process.env.NEXT_PUBLIC_SUPABSE2SECRET!;

const supabase = createClient(SURL, SSECRET);

export const POST = async () => {
  try {
    const companies = [
      {
        name: "FinTech Solutions",
        description:
          "AI-powered analytics platform for financial risk management and investment strategies.",
        industry: "Finance",
        country: "USA",
      },
      {
        name: "Green Energy Hub",
        description:
          "A renewable energy startup focused on solar and wind power solutions.",
        industry: "Renewable Energy",
        country: "Germany",
      },
      {
        name: "MediTech AI",
        description:
          "Developing AI-driven diagnostics for early disease detection and personalized treatments.",
        industry: "Healthcare",
        country: "UK",
      },
      {
        name: "AutoDrive Innovations",
        description:
          "Autonomous vehicle technology company enhancing safety and efficiency in transportation.",
        industry: "Automobile",
        country: "Japan",
      },
      {
        name: "CyberShield Security",
        description:
          "Provides enterprise-level cybersecurity solutions to prevent data breaches and cyberattacks.",
        industry: "Cybersecurity",
        country: "USA",
      },
      {
        name: "E-Commerce AI",
        description:
          "AI-based recommendation engine for online retailers to boost customer engagement.",
        industry: "E-Commerce",
        country: "India",
      },
      {
        name: "BioTech Genomics",
        description:
          "Developing next-generation genome sequencing technologies for precision medicine.",
        industry: "Biotechnology",
        country: "France",
      },
      {
        name: "AgriTech Solutions",
        description:
          "AI-powered predictive analytics for increasing crop yield and reducing waste.",
        industry: "Agriculture",
        country: "Brazil",
      },
      {
        name: "Blockchain Finance",
        description:
          "A decentralized finance platform leveraging blockchain for secure transactions.",
        industry: "Finance",
        country: "Switzerland",
      },
      {
        name: "Smart Home AI",
        description:
          "Developing AI-powered smart home automation systems for energy efficiency.",
        industry: "IoT",
        country: "Canada",
      },
      {
        name: "MedSupply Chain",
        description:
          "An AI-powered logistics platform optimizing the supply chain for pharmaceuticals.",
        industry: "Healthcare",
        country: "Netherlands",
      },
      {
        name: "SpaceTech Innovations",
        description:
          "Developing propulsion systems for interplanetary travel and satellite technology.",
        industry: "Aerospace",
        country: "USA",
      },
      {
        name: "FoodAI Robotics",
        description:
          "AI-powered robotic kitchens for automating food preparation and delivery.",
        industry: "FoodTech",
        country: "Italy",
      },
      {
        name: "InsurTech Analytics",
        description:
          "AI-driven risk assessment for insurance companies to optimize policy pricing.",
        industry: "Insurance",
        country: "Australia",
      },
      {
        name: "LegalAI Advisor",
        description:
          "An AI-powered legal research assistant for law firms and legal professionals.",
        industry: "LegalTech",
        country: "Germany",
      },
      {
        name: "Green Transport Solutions",
        description:
          "Electric vehicle battery optimization for sustainable transportation.",
        industry: "Automobile",
        country: "Norway",
      },
      {
        name: "EduTech AI",
        description:
          "AI-powered personalized learning platform for students and professionals.",
        industry: "Education",
        country: "UK",
      },
      {
        name: "SupplyChain AI",
        description:
          "Optimizing global supply chain networks using AI-powered analytics.",
        industry: "Logistics",
        country: "Singapore",
      },
      {
        name: "Neural Network Labs",
        description:
          "Researching next-generation deep learning algorithms for artificial intelligence.",
        industry: "AI Research",
        country: "USA",
      },
      {
        name: "Smart Farming AI",
        description:
          "AI-driven automation for precision farming and livestock monitoring.",
        industry: "Agriculture",
        country: "Canada",
      },
      {
        name: "Quantum Computing Hub",
        description:
          "Developing quantum computing frameworks for advanced cryptography and AI.",
        industry: "Quantum Computing",
        country: "Sweden",
      },
      {
        name: "RetailAI Insights",
        description:
          "AI-powered customer behavior analytics for physical and online retailers.",
        industry: "Retail",
        country: "USA",
      },
      {
        name: "MarTech AI",
        description:
          "AI-driven marketing automation platform for customer engagement and conversion optimization.",
        industry: "Marketing Technology",
        country: "Spain",
      },
      {
        name: "Wearable HealthTech",
        description:
          "Developing AI-powered wearable devices for real-time health monitoring.",
        industry: "Healthcare",
        country: "Japan",
      },
      {
        name: "CloudSec Cybersecurity",
        description:
          "Cloud-based security solutions to protect enterprise systems from cyber threats.",
        industry: "Cybersecurity",
        country: "Germany",
      },
      {
        name: "Autonomous Drone AI",
        description:
          "AI-powered drone technology for aerial surveillance and logistics.",
        industry: "Aerospace",
        country: "France",
      },
      {
        name: "AI Legal Compliance",
        description:
          "Automating regulatory compliance processes with AI-driven insights.",
        industry: "LegalTech",
        country: "Switzerland",
      },
      {
        name: "Urban Mobility AI",
        description:
          "AI-powered traffic optimization solutions for smart cities.",
        industry: "Transportation",
        country: "Netherlands",
      },
      {
        name: "Edge AI Robotics",
        description:
          "Developing AI-powered robots for industrial automation and manufacturing.",
        industry: "Robotics",
        country: "China",
      },
    ];

    // Loop through each company
    let companiesWithEmbeddings = [];

    // Loop through each company to generate embeddings
    for (const company of companies) {
      const { name, description, industry, country } = company;

      // Call Supabase Edge Function to generate an embedding
      const { data: embeddingData, error: embeddingError } =
        await supabase.functions.invoke("openai-embedding-function", {
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
