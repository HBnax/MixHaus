import { IFilterStrategy } from "./IFilterStrategy";
import { CocktailSearchResult } from "./CocktailSearchResult";

export class AlcoholicFilterStrategy implements IFilterStrategy {
    filter(drinkList: CocktailSearchResult, filterStr: string): CocktailSearchResult {
        if (drinkList.drinks && filterStr !== "") {
            const filteredDrinks = drinkList.drinks.filter((drink) => drink.strAlcoholic === filterStr || drink.strAlcoholic === "Optional alcohol");
            return { drinks: filteredDrinks };
        }
        return drinkList;
    }
}