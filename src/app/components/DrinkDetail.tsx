"use client";

import Image from "next/image";
import { Drink } from "../Drink";

type Props = {
  drink: Drink;
};

export default function DrinkDetail({ drink }: Props) {
  const ingredients: string[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}` as keyof Drink];
    const measure = drink[`strMeasure${i}` as keyof Drink];
    if (ingredient) {
      ingredients.push(`${measure ?? ""} ${ingredient}`.trim());
    }
  }

  const isAlcoholic = drink.strAlcoholic?.toLowerCase() === "alcoholic";

  return (
    <div className="w-full max-w-5xl px-6 py-10 flex flex-col sm:flex-row items-center justify-center bg-transparent">
      {/* Image Section */}
      <div className="w-full sm:w-1/2 flex justify-center items-center mb-6 sm:mb-0">
        <Image
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          width={300}
          height={300}
          className="rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="w-full sm:w-1/2 flex flex-col gap-4 text-center sm:text-left text-white px-4">
        {/* Title + 21+ Badge */}
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

        <div>
          <p className="text-sm text-gray-400 font-semibold">Instructions:</p>
          <p className="text-gray-200 leading-relaxed">{drink.strInstructions}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 font-semibold">Ingredients:</p>
          <ul className="list-disc list-inside text-gray-200 space-y-1">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
