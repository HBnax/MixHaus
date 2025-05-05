export class Database {
    private static baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

    private static async query(query: string): Promise<unknown> {
        const response = await fetch(`${Database.baseUrl}${query}`);
        if (!response.ok)
            throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    }

    static async getCocktailsByName(name: string): Promise<unknown> {
        return await this.query(`search.php?s=${name}`);
    }

    static async getCocktailsById(id: string): Promise<unknown> {
        return await this.query(`lookup.php?i=${id}`);
    }

    static async getIngredientByName(name: string): Promise<unknown> {
        return await this.query(`search.php?i=${name}`);
    }

    static async getIngredientById(id: string): Promise<unknown> {
        return await this.query(`lookup.php?iid=${id}`);
    }

    static async getByAlcoholic(isAlcoholic: boolean): Promise<unknown> {
        const alcoholic = isAlcoholic ? 'Alcoholic' : 'Non_Alcoholic';
        return await this.query(`filter.php?a=${alcoholic}`);
    }

    static async getByCategory(category: string): Promise<unknown> {
        return await this.query(`filter.php?c=${category}`);
    }

    static async getCategories(): Promise<unknown> {
        return await this.query('list.php?c=list');
    }

    static async getIngredients(): Promise<unknown> {
        return await this.query('list.php?i=list');
    }

    static async getCocktailsByIngredients(ingredients: string[]): Promise<{ drinks: unknown[] }> {
        const results = await Promise.all(
            ingredients.map(ingredient => this.query(`filter.php?i=${ingredient}`) as Promise<{ drinks: { idDrink: string }[] }>)
        );

        for (let resultIndex = 1; resultIndex < results.length; resultIndex++) {
            const result = results[resultIndex];
            const drinksSet = new Set(result.drinks.map(drink => drink.idDrink));
            results[0].drinks = results[0].drinks.filter(drink => drinksSet.has(drink.idDrink));
        }
        return results[0];
    }
}