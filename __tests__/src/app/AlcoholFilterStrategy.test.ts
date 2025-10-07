import { AlcoholicFilterStrategy } from "../../../src/app/AlcoholFilterStrategy";
import { CocktailSearchResult } from "../../../src/app/CocktailSearchResult";

describe("AlcoholFilterStrategy", () => {
    let filterStrategy: AlcoholicFilterStrategy;
    
    beforeEach(() => {
        filterStrategy = new AlcoholicFilterStrategy();
    });
    
    it("should filter out non-alcoholic drinks", () => {
        const input: CocktailSearchResult = {
            drinks: [
                { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic", strGlass: "Highball glass", strInstructions: "Mix ingredients and serve." },
                { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic", strGlass: "Collins glass", strInstructions: "Mix ingredients and serve chilled." },
            ]
        };
    
        const expectedOutput: CocktailSearchResult = {
            drinks: [
                { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic", strGlass: "Highball glass", strInstructions: "Mix ingredients and serve." },
            ]
        };
    
        const result = filterStrategy.filter(input, "Alcoholic");
        expect(result).toEqual(expectedOutput);
    });

    it("should filter out alcoholic drinks", () => {
        const input: CocktailSearchResult = {
            drinks: [
                { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic", strGlass: "Highball glass", strInstructions: "Mix ingredients and serve." },
                { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic", strGlass: "Collins glass", strInstructions: "Mix ingredients and serve chilled." },
            ]
        };
        const expectedOutput: CocktailSearchResult = {
            drinks: [
                { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic", strGlass: "Collins glass", strInstructions: "Mix ingredients and serve chilled." },
            ]
        };
        const result = filterStrategy.filter(input, "Non alcoholic");
        expect(result).toEqual(expectedOutput);
    });

    it("should always include drinks marked as 'Optional alcohol'", () => {
        const input: CocktailSearchResult = {
            drinks: [
                { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Optional alcohol", strGlass: "Highball glass", strInstructions: "Mix ingredients and serve." },
                { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic", strGlass: "Collins glass", strInstructions: "Mix ingredients and serve chilled." },
            ]
        };
        const expectedOutput: CocktailSearchResult = {
            drinks: [
                { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Optional alcohol", strGlass: "Highball glass", strInstructions: "Mix ingredients and serve." },
                { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic", strGlass: "Collins glass", strInstructions: "Mix ingredients and serve chilled." },
            ]
        };
        const result = filterStrategy.filter(input, "Non alcoholic");
        expect(result).toEqual(expectedOutput);
    });

    it("should return the same data if no drinks are present", () => {
        const input: CocktailSearchResult = {
            drinks: null
        };
    
        const result = filterStrategy.filter(input, "any");
        expect(result).toEqual(input);
    });

    it("should return all drinks if no filter is applied", () => {
        const input: CocktailSearchResult = {
            drinks: [
                { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic", strGlass: "Highball glass", strInstructions: "Mix ingredients and serve." },
                { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic", strGlass: "Collins glass", strInstructions: "Mix ingredients and serve chilled." },
            ]
        };
        const expectedOutput = input;
        const result = filterStrategy.filter(input, "");
        expect(result).toEqual(expectedOutput);
    });
});