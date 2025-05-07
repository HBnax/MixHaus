"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Database, Drink } from "./Database";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()){
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const result = await Database.getCocktailsByName(query.trim());
      const filteredResults = (result.drinks || []).filter((drink: Drink) => 
      drink.strDrink.toLowerCase().startsWith(query.toLowerCase())
    );
      setSearchResults(filteredResults || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchQuery);
    }, 10);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 mb-[50] gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="absolute top-0 left-0 w-full flex items-start justify-between h-[120px] p-4 z-10">
        <div className="flex items-center gap-2">
          <Image
            src="/mixhaus.svg"
            alt="Mixhaus logomark"
            width={100}
            height={100}
          />
          <span className="text-lg font-bold">
            <Link href="/">MixHaus</Link>
          </span>
        </div>
        <div
          className="flex items-center"
          style={{ marginTop: "30px", marginRight: "20px" }}
        >
          <Image
            src="/glassIcon.svg"
            alt="Mixhaus logomark"
            width={30}
            height={30}
          />
        </div>
      </header>

      <div className="w-full h-[3px] bg-[#a984ee] absolute top-[120px]"></div>

      <section className="flex flex-col gap-[32px] min-h-[300px] row-start-2 items-start justify-start sm:items-start mt-12 mb-[50]">
        <div className="text-center">
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-4xl font-bold text-center">
              Welcome to MixHaus
            </h1>
            <p className="text-lg">
              Your one-stop destination for the best cocktail recipes.
            </p>
          </div>
        </div>
        <form
          onSubmit={(query) => {
          query.preventDefault();
          handleSearch(searchQuery);
          }}
          className="flex items-center gap-2 mt-8"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(query) => setSearchQuery(query.target.value)}
            placeholder="Search for cocktails..."
            className="border border-gray-300 rounded-lg p-2 w-[375px] focus:outline-none focus:ring-1 focus:ring-[#a984ee]"
          />
          <button
            type="submit"
            className="bg-[#a984ee] text-white rounded-lg px-4 py-2 hover:bg-[#9171cb] transition"
          >
            Search
          </button>
        </form>
      </section>

      <div className="h-100"></div>

      <section className="w-full min-h-[200px] flex flex-col items-center mt-10">
        {isLoading && <p className="text-gray-500"> Loading...</p>}

          {!isLoading && searchResults.length > 0 ? (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((drink: Drink) => (
                <li key={drink.idDrink} className="border p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <Image
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <h2 className="font-bold text-xl mt-2">{drink.strDrink}</h2>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && searchQuery && (
              <p className ="text-gray-500">
                No results found for "{searchQuery}"
              </p>
            )
          )}
        </section>

      <div className="h-40"></div>

      <footer className="flex gap-[14px] flex-wrap items-center justify-center">
        <span className="flex items-center gap-2">Mix. Sip. Repeat.</span>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-[#c2a9f5]"
          href="about"
        >
          About
        </Link>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-[#c2a9f5]"
          href="https://forms.gle/rxcNXJFtwxizjCxA8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </footer>
    </div>
  );
}
