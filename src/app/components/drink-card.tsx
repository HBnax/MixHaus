"use client";

import Image from "next/image";
import Link from "next/link";
import { Drink } from "../Drink";

type Props = {
  drink: Drink;
};

export default function DrinkCard({ drink }: Props) {
  return (
    <Link
      href={`/drink/${drink.idDrink}`}
      className="border p-3 rounded-lg flex flex-col items-center justify-center text-center hover:shadow-md transition"
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
  );
}
