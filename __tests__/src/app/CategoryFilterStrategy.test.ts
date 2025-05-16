import { CategoryFilterStrategy } from "../../../src/app/CategoryFilterStrategy";
import { CocktailSearchResult } from "../../../src/app/CocktailSearchResult";

describe("CategoryFilterStrategy", () => {
    let filterStrategy: CategoryFilterStrategy;

    beforeEach(() => {
        filterStrategy = new CategoryFilterStrategy();
    });

    it("should filter drinks by category", () => {
        const input: CocktailSearchResult = {
            drinks: [
                { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
                { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic" },
            ]
        };

        const expectedOutput: CocktailSearchResult = {
            drinks: [
                { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
            ]
        };
        
        const result = filterStrategy.filter(input, "Cocktail");
        expect(result).toEqual(expectedOutput);
    });

    it("should return all drinks if no category is provided", () => {
        const input: CocktailSearchResult = {
            drinks: [
                { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
                { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic" },
            ]
        };
        const expectedOutput = input;
        const result = filterStrategy.filter(input, "");
        expect(result).toEqual(expectedOutput);
    });
});