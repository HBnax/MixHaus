import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DrinkDetail from "src/app/components/DrinkDetail";
import { Drink } from "src/app/Drink";

async function fetchDrinkById(id: string): Promise<Drink | null> {
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  return data.drinks?.[0] || null;
}

export default async function DrinkPage({ params }: { params: { id: string } }) {
  // No destructuring before render
  const drink = await fetchDrinkById(params.id);

  if (!drink) return notFound();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 mb-[50] gap-16 sm:p-20">
      <header className="absolute top-0 left-0 w-full flex items-start justify-between h-[100px] p-4 z-10">
      <div className="flex items-center gap-2">
        <Image src="/mixhaus1.svg" alt="Mixhaus logomark" width={60} height={60} />
        <span
          className="text-xl font-bold"
          style={{ fontFamily: "Copperplate, sans-serif" }}
        >
          <Link href="/">MixHaus</Link>
        </span>
      </div>
        <div className="flex items-center mt-[30px] mr-[20px]">
          <Image src="/glassIcon.svg" alt="Glass Icon" width={30} height={30} />
        </div>
      </header>

      <div className="w-full h-[3px] bg-[#a984ee] absolute top-[120px]"></div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Link href="/" className="text-[#a984ee] hover:underline text-sm mb-4 sm:mb-0">
        ← Back to Search
        </Link>
        <DrinkDetail drink={drink} />
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center p-4 mt-6">
        <span className="flex items-center gap-2">Mix. Sip. Repeat.</span>
        <Link className="hover:underline hover:underline-offset-4 hover:text-[#c2a9f5]" href="/about">
          About
        </Link>
        <a
          className="hover:underline hover:underline-offset-4 hover:text-[#c2a9f5]"
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
