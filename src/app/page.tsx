"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { database } from "./Database";
import { Drink } from "./Drink";
import { DrinkHierarchy } from "./DrinkHierarchy";
import { DrinkFilter } from "./DrinkFilter";
import { AlcoholicFilterStrategy } from "./AlcoholFilterStrategy";
import { CategoryFilterStrategy } from "./CategoryFilterStrategy";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const drinkFilterRef = useRef(new DrinkFilter());

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const filters = [
  { label: "Alcoholic", strategy: new AlcoholicFilterStrategy(), type: "Alcoholic" },
  { label: "Non-alcoholic", strategy: new AlcoholicFilterStrategy(), type: "Non alcoholic" },
  { label: "Cocktail", strategy: new CategoryFilterStrategy(), type: "Cocktail" },
  { label: "Ordinary Drink", strategy: new CategoryFilterStrategy(), type: "Ordinary Drink" },
  ];

  const toggleFilter = (label: string, strategy: any, type: string) => {
    const updatedFilters = [...selectedFilters];
    const index = selectedFilters.indexOf(label);
    if (index > -1) {
      updatedFilters.splice(index, 1);
      drinkFilterRef.current.removeFilterStrategy(type);
    } else {
      updatedFilters.push(label);
      drinkFilterRef.current.addFilterStrategy(strategy, type);
    }
    setSelectedFilters(updatedFilters);
    handleSearch(searchQuery);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const result = await database.getCocktailsByName(query.trim());
      const sortedResults = DrinkHierarchy.sort(result.drinks || []);
      const actualResults = DrinkHierarchy.filterToStartWithQuery(sortedResults, query);
      const filteredResults = drinkFilterRef.current.filter(actualResults);
      setSearchResults(filteredResults);
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 mb-[50] gap-16 sm:p-20 bg-gradient-to-br from-[#1a0f2f] via-[#0d0717] to-black text-white">
      <header className="absolute top-0 left-0 w-full flex items-start justify-between h-[100px] p-4 z-10">
        <div className="flex items-center gap-2">
          <Image src="/mixhaus.svg" alt="Mixhaus logomark" width={60} height={60} />
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "Copperplate, sans-serif" }}
          >
            <Link href="/">MixHaus</Link>
          </span>
        </div>
        <div className="flex items-center mt-[24px] mr-[20px] gap-4">
          <Image src="/glassIcon.svg" alt="Glass Icon" width={24} height={24} />
          <select
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
            className="bg-transparent text-[#a984ee] border border-[#a984ee] px-2 py-1 rounded"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </header>

      <div className="w-full h-[3px] bg-[#a984ee] absolute top-[120px]"></div>

      <main className="row-start-2 w-full flex flex-col items-center text-center justify-center gap-10">
        <section className="flex flex-col gap-[32px] row-start-2 items-center justify-center content-center text-center mt-12">
          <div className="text-center items-center justify-center">
            <div className="flex flex-col gap-4 justify-center items-center text-center">
              <h1
                className="text-2xl sm:text-4xl font-bold tracking-widest text-center"
                style={{ fontFamily: "Copperplate, sans-serif" }}
              >
                Welcome to MixHaus
              </h1>
              <p className="text-lg font-[family-name:helvetica] text-center w-full">
                Your one-stop destination for the best cocktail recipes.
              </p>
            </div>
          </div>
          <form
            onSubmit={(query) => {
              query.preventDefault();
              handleSearch(searchQuery);
            }}
            className="flex items-center gap-2 mt-4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(query) => setSearchQuery(query.target.value)}
              placeholder="Search for cocktails..."
              className="border border-gray-300 rounded-lg p-2 w-[375px] focus:outline-none focus:ring-1 focus:ring-[#a984ee] font-[family-name:helvetica] bg-black text-white"
            />
            <button
              type="submit"
              className="bg-[#a984ee] text-white rounded-lg px-4 py-2 hover:bg-[#9171cb] transition"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            {filters.map(({ label, strategy, type }) => (
              <button
                key={label}
                className={`px-4 py-1 rounded-full border transition-all duration-200 text-sm font-medium ${
                  selectedFilters.includes(label)
                    ? "bg-[#a984ee33] border-[#a984ee] text-white"
                    : "bg-[#1c1c1c] border-gray-600 text-white hover:bg-[#2c2c2c]"
                }`}
                onClick={() => toggleFilter(label, strategy, type)}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="w-full min-h-[200px] max-w-[800px] text-center items-center mt-2">
          {isLoading && (
            <div className="animate-pulse text-[#a984ee] text-sm">Mixing drinks...</div>
          )}

          {!isLoading && searchResults.length > 0 ? (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((drink: Drink) => (
                <li
                  key={drink.idDrink}
                  className="border border-[#a984ee44] p-3 rounded-lg flex flex-col items-center justify-center text-center transition shadow-sm hover:shadow-[0_0_25px_#a984ee] hover:border-[#a984ee] hover:scale-105"
                >
                  <Link
                    href={`/drink/${drink.idDrink}`}
                    className="w-full h-full flex flex-col items-center justify-center text-center transition"
                  >
                    <Image
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                    <h2 className="font-bold text-xl mt-2">{drink.strDrink}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && searchQuery && (
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
            )
          )}
        </section>
      </main>

      <footer className="row-start-3 flex gap-[14px] flex-wrap items-center justify-center mt-auto">
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
