import { AlcoholicFilterStrategy } from "./AlcoholFilterStrategy";
import { CategoryFilterStrategy } from "./CategoryFilterStrategy";
import { database } from "./Database";

export class DrinkFilters {
    alcoholicFilters: { name: string, strategy: AlcoholicFilterStrategy }[] = [];
    categoryFilters: { name: string, strategy: CategoryFilterStrategy }[] = [];

    async populateFilters() {
        const alcoholicCategories = await database.getAlcoholicCategories() as unknown as { drinks: { strAlcoholic: string }[] };
        const otherCategories = await database.getCategories() as unknown as { drinks: { strCategory: string }[] };
        this.alcoholicFilters = alcoholicCategories.drinks.map(drink => ({
            name: drink.strAlcoholic, 
            strategy: new AlcoholicFilterStrategy()
        }));
        this.categoryFilters = otherCategories.drinks.map(drink => ({
            name: drink.strCategory, 
            strategy: new CategoryFilterStrategy()
        }));
    }
    
    getAlcoholicFilters() {
        return this.alcoholicFilters;
    }

    getCategoryFilters() {
        return this.categoryFilters;
    }

    getAllFilters() {
        return [...this.alcoholicFilters, ...this.categoryFilters];
    }
}