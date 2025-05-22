// Fixes syntax errors in your provided page.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { database } from "./Database";
import { Drink } from "./Drink";
import { DrinkHierarchy } from "./DrinkHierarchy";
import { DrinkFilter } from "./DrinkFilter";
import { IFilterStrategy } from "./IFilterStrategy";
import { DrinkFilters } from "./DrinkFilters";
import MouseTracker from "./MouseTracker";
import LogoObserver from "./LogoObserver";

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

  const [filters, setFilters] = useState<{ name: string; strategy: IFilterStrategy }[]>([]);
  useEffect(() => {
    const fetchFilters = async () => {
      const drinkFilters = new DrinkFilters();
      await drinkFilters.populateFilters();
      setFilters(drinkFilters.getAllFilters());
    };
    fetchFilters();
  }, []);

  const toggleFilter = (name: string, strategy: IFilterStrategy) => {
    const updatedFilters = [...selectedFilters];
    const index = selectedFilters.indexOf(name);
    if (index > -1) {
      updatedFilters.splice(index, 1);
      drinkFilterRef.current.removeFilterStrategy(name);
    } else {
      updatedFilters.push(name);
      drinkFilterRef.current.addFilterStrategy(strategy, name);
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
    <>
      <MouseTracker />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 mb-[50] gap-16 sm:p-20 bg-gradient-to-br from-[#1a0f2f] via-[#0d0717] to-black text-white">
        <header className="absolute top-0 left-0 w-full flex items-start justify-between h-[100px] p-4 z-10">
          <div className="flex items-center gap-2">
            <LogoObserver />
            <span className="text-xl font-bold" style={{ fontFamily: "Copperplate, sans-serif" }}>
              <Link href="/">MixHaus</Link>
            </span>
          </div>
          <div className="flex items-center mt-[24px] mr-[20px] gap-4">
            <Image src="/glassIcon.svg" alt="Glass Icon" width={24} height={24} />
          </div>
        </header>

        <div className="w-full h-[3px] bg-[#a984ee] absolute top-[120px]" />

        <main className="row-start-2 w-full flex flex-col items-center text-center justify-center gap-10">
          <section className="flex flex-col gap-[32px] row-start-2 items-center justify-center content-center text-center mt-12">
            <div className="flex flex-col gap-4 justify-center items-center text-center">
              <h1 className="text-2xl sm:text-4xl font-bold tracking-widest text-center" style={{ fontFamily: "Copperplate, sans-serif" }}>
                Welcome to MixHaus
              </h1>
              <p className="text-lg font-[family-name:helvetica] text-center w-full">
                Your one-stop destination for the best cocktail recipes.
              </p>
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
                placeholder="Search for cocktails..."
                className="px-4 py-2 rounded-md border border-gray-600 bg-black text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#a984ee] text-white px-4 py-2 rounded-md hover:bg-[#c2a9f5] transition"
              >
                Search
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-7 gap-1 sm:gap-2 justify-items-center mt-6 px-4">
              {filters.map(({ name, strategy }) => (
                <button
                  key={name}
                  className={`px-4 py-1 rounded-full border transition-all duration-200 text-sm font-medium ${
                    selectedFilters.includes(name)
                      ? "bg-[#a984ee33] border-[#a984ee] text-white"
                      : "bg-[#1c1c1c] border-gray-600 text-white hover:bg-[#2c2c2c]"
                  }`}
                  onClick={() => toggleFilter(name, strategy)}
                >
                  {name}
                </button>
              ))}
            </div>
          </section>

          <section className="w-full min-h-[200px] max-w-[800px] text-center items-center mt-2">
            {isLoading && (
              <div className="animate-pulse text-[#a984ee] text-sm">
                Mixing drinks...
              </div>
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
              !isLoading &&
              searchQuery && <p className="text-gray-500">No results found for "{searchQuery}"</p>
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
    </>
  );
}
