import { AlcoholicFilterStrategy } from '../../../src/app/AlcoholFilterStrategy';
import { CategoryFilterStrategy } from '../../../src/app/CategoryFilterStrategy';
import { DrinkFilter } from '../../../src/app/DrinkFilter';

describe("DrinkFilter", () => {
    it("should not filter out drinks when no filter is applied", () => {
        const input = [
            { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
            { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic" },
        ];

        const filter = new DrinkFilter();
        const result = filter.filter(input);

        expect(result).toEqual(input);
    });

    it("should filter drinks based on a single filter applied", () => {
        const input = [
            { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
            { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic" },
        ];

        const filter = new DrinkFilter();
        filter.addFilterStrategy(new CategoryFilterStrategy(), "Cocktail");
        const result = filter.filter(input);

        expect(result).toEqual([
            { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" }
        ]);
    });

    it("should filter drinks based on multiple filters applied", () => {
        const input = [
            { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
            { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic" },
        ];

        const filter = new DrinkFilter();
        filter.addFilterStrategy(new CategoryFilterStrategy(), "Cocktail");
        filter.addFilterStrategy(new CategoryFilterStrategy(), "Mocktail");
        const result = filter.filter(input);

        expect(result).toEqual([
            { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
            { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic" }
        ]);
    });

    it("should filter drinks uniquely based on multiple filters applied", () => {
        const input = [
            { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
            { idDrink: "2", strDrink: "Virgin Mojito", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic" },
            { idDrink: "3", strDrink: "Margarita", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
            { idDrink: "4", strDrink: "Pina Colada", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Optional alcohol" },
            { idDrink: "5", strDrink: "Virgin Pina Colada", strCategory: "Mocktail", strDrinkThumb: "", strAlcoholic: "Non alcoholic" }
        ];

        const filter = new DrinkFilter();
        filter.addFilterStrategy(new AlcoholicFilterStrategy(), "Alcoholic");
        filter.addFilterStrategy(new AlcoholicFilterStrategy(), "Optional alcohol");
        const result = filter.filter(input);
        expect(result).toEqual([
            { idDrink: "1", strDrink: "Mojito", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
            { idDrink: "3", strDrink: "Margarita", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Alcoholic" },
            { idDrink: "4", strDrink: "Pina Colada", strCategory: "Cocktail", strDrinkThumb: "", strAlcoholic: "Optional alcohol" }
        ]);
    });
});