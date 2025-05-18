"use client";

import Image from "next/image";
import { useRef } from "react";
import { Drink } from "../Drink";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  drink: Drink;
};

export default function DrinkDetail({ drink }: Props) {
  const ingredients: string[] = [];
  const scrollRef = useRef<HTMLDivElement>(null);

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}` as keyof Drink];
    const measure = drink[`strMeasure${i}` as keyof Drink];
    if (ingredient) {
      ingredients.push(`${measure ?? ""} ${ingredient}`.trim());
    }
  }

  const isAlcoholic = drink.strAlcoholic?.toLowerCase() === "alcoholic";

  const instructionSteps = drink.strInstructions
    ? drink.strInstructions.split(/(?<=\.)\s+/).filter(Boolean)
    : [];

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 150;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-5xl px-6 py-10 flex flex-col sm:flex-row sm:items-start sm:gap-16 items-center justify-center bg-transparent">
      {/* Image Section */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center mb-6 sm:mb-0">
        <Image
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          width={300}
          height={300}
          className="rounded-2xl shadow-lg object-cover"
        />

        {/* Ingredient Carousel */}
        {ingredients.length > 0 && (
          <div className="w-full overflow-hidden mt-10 relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#a984ee] text-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => scroll("left")}
            >
              <ChevronLeft size={16} />
            </button>

            <div
              className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-8"
              ref={scrollRef}
            >
              {ingredients.map((item, idx) => {
                const ingredientKey = `strIngredient${idx + 1}` as keyof Drink;
                const ingredientName = drink[ingredientKey];

                if (!ingredientName || typeof ingredientName !== "string") return null;

                return (
                  <div key={idx} className="flex-shrink-0 text-center w-[70px]">
                    <Image
                      src={`https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`}
                      alt={ingredientName}
                      width={50}
                      height={50}
                      className="transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_0.5rem_#a984ee]"
                    />
                    <p className="text-xs text-white mt-1 break-words text-center">
                      {ingredientName}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#a984ee] text-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => scroll("right")}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="w-full sm:w-1/2 flex flex-col gap-6 text-center sm:text-left text-white px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1
            className="text-4xl font-bold tracking-wide"
            style={{ fontFamily: "Copperplate, sans-serif" }}
          >
            {drink.strDrink}
          </h1>
          {isAlcoholic && (
            <span
              className="text-[#a984ee] text-2xl font-bold"
              style={{ fontFamily: "Copperplate, sans-serif" }}
            >
              21+
            </span>
          )}
        </div>

        {/* Category below name */}
        {drink.strCategory && (
          <p
            className="text-[#a984ee] text-sm"
            style={{ fontFamily: "Copperplate, sans-serif" }}
          >
            {drink.strCategory}
          </p>
        )}

        <div>
          <p className="text-sm text-gray-400 font-semibold">Instructions:</p>
          <ol className="text-gray-200 list-decimal list-inside space-y-1">
            {instructionSteps.map((step, index) => (
              <li key={index}>{step.trim()}</li>
            ))}
          </ol>
        </div>

        <div>
          <p className="text-sm text-gray-400 font-semibold">Ingredients:</p>
          <ul className="list-disc list-inside text-gray-200 space-y-1">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Glass type */}
        {drink.strGlass && (
          <div>
            <p className="text-sm text-gray-400 font-semibold">Glass:</p>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>{drink.strGlass}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
