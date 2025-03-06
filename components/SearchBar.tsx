"use client";

import { useState, useEffect } from "react";

export default function SearchBar({ api }: { api: string }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async (
    searchQuery = "",
    industryFilter = "",
    countryFilter = "",
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("query", searchQuery);
      // if (industryFilter) params.append("industry", industryFilter);
      // if (countryFilter) params.append("country", countryFilter);

      const response = await fetch(`/api/${api}?query=${searchQuery}`);
      const data = await response.json();
      setCompanies(data.data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    fetchCompanies(query, industry, country);
  };

  const searchSuggestions = [
    "I am looking for a fintech company specializing in AI-driven investment strategies.",
    "Find a renewable energy startup focused on solar power solutions.",
    "Looking for an AI company in healthcare that develops diagnostic tools.",
    "Show me companies working on autonomous vehicles and self-driving technology.",
    "I need a cybersecurity firm that provides enterprise-level data protection.",
    // Add more from the list above...
  ];

  return (
    <div className="w-full bg-gray-100 h-auto flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-gray-300 px-6 ">
        {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Company Search
        </h2> */}

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            type="text"
            list="search-suggestions"
            placeholder="Describe the company you're looking for..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 text-[15px] py-2 border text-gray-700 border-gray-400 bg-white rounded-md focus:border-blue-500"
          />
          <datalist id="search-suggestions">
            {searchSuggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>

          <button
            onClick={handleSearch}
            className="bg-blue-500 border border-blue-700 cursor-pointer transition-all text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 py-4 flex flex-col gap-2 overflow-auto scrollbar-hidden">
        {companies.map((company: any) => (
          <div
            key={company.id}
            className={`p-4 border rounded-lg bg-white ${api === "companies" ? "border-green-600" : "border-blue-600"} ${loading ? "opacity-50" : ""}`}
          >
            <h3
              className={`text-lg font-semibold ${api === "companies" ? "text-green-600" : "text-blue-600"}`}
            >
              {company.name}
            </h3>
            <p className="text-gray-600">{company.description}</p>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Industry: {company.industry}</span>
              <span>Country: {company.country}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
