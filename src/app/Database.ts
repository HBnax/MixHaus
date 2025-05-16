import { Drink } from "./Drink";

export type CocktailSearchResult = {
  drinks: Drink[] | null;
};

class Database {
  private static instance: Database;
  private baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/";

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async query(query: string): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}${query}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  }

  async getCocktailsByName(name: string): Promise<CocktailSearchResult> {
    return (await this.query(`search.php?s=${name}`)) as CocktailSearchResult;
  }

  async getCocktailsById(id: string): Promise<unknown> {
    return await this.query(`lookup.php?i=${id}`);
  }

  async getIngredientByName(name: string): Promise<unknown> {
    return await this.query(`search.php?i=${name}`);
  }

  async getIngredientById(id: string): Promise<unknown> {
    return await this.query(`lookup.php?iid=${id}`);
  }

  async getByAlcoholic(isAlcoholic: boolean): Promise<unknown> {
    const alcoholic = isAlcoholic ? "Alcoholic" : "Non_Alcoholic";
    return await this.query(`filter.php?a=${alcoholic}`);
  }

  async getByCategory(category: string): Promise<unknown> {
    return await this.query(`filter.php?c=${category}`);
  }

  async getCategories(): Promise<unknown> {
    return await this.query("list.php?c=list");
  }

  async getIngredients(): Promise<unknown> {
    return await this.query("list.php?i=list");
  }

  async getCocktailsByIngredients(
    ingredients: string[]
  ): Promise<{ drinks: unknown[] }> {
    const results = await Promise.all(ingredients.map((ingredient) => 
      this.query(`filter.php?i=${ingredient}`) as Promise<{drinks: { idDrink: string }[];}>)
    );

    for (let resultIndex = 1; resultIndex < results.length; resultIndex++) {
      const result = results[resultIndex];
      const drinksSet = new Set(result.drinks.map((drink) => drink.idDrink));
      results[0].drinks = results[0].drinks.filter((drink) =>
        drinksSet.has(drink.idDrink)
      );
    }
    return results[0];
  }
}

const database = Database.getInstance();
export { database };