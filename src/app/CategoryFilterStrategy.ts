import { IFilterStrategy } from "./IFilterStrategy";
import { CocktailSearchResult } from "./CocktailSearchResult";

export class CategoryFilterStrategy implements IFilterStrategy {
    filter(drinkList: CocktailSearchResult, filterStr: string): CocktailSearchResult {
        if (drinkList.drinks && filterStr !== "") {
            const filteredDrinks = drinkList.drinks.filter((drink) => drink.strCategory === filterStr);
            return { drinks: filteredDrinks };
        }
        return drinkList;
    }
}