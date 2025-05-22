'use client';

import Link from "next/link";
import Image from "next/image";
import { Drink } from "src/app/Drink";

export default function DrinkGrid({ drinks }: { drinks: Drink[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
      {drinks.map((drink) => (
        <Link href={`/drink/${drink.idDrink}`} key={drink.idDrink}>
          <div className="border border-gray-600 rounded-lg p-4 text-center hover:shadow-lg hover:scale-105 transition transform duration-200 bg-black bg-opacity-40">
            <Image
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              width={200}
              height={200}
              className="mx-auto rounded-md"
            />
            <h2
              className="mt-4 text-white font-bold text-lg"
              style={{ fontFamily: "Copperplate, sans-serif" }}
            >
              {drink.strDrink.toUpperCase()}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
