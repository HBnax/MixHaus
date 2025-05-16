import { CocktailSearchResult } from "./CocktailSearchResult";

export interface IFilterStrategy {
    filter(drinkList: CocktailSearchResult, filterStr: string): CocktailSearchResult;
}