import { DrinkHierarchy } from "../../../src/app/ResultHierarchy";
import { Drink } from "../../../src/app/Drink";

describe('ResultHierarchy', () => {
    const drinks = [
        { idDrink: 1, strDrink: 'Margarita', strCategory: 'Cocktail', strDrinkThumb: 'url1' },
        { idDrink: 2, strDrink: 'Mojito', strCategory: 'Cocktail', strDrinkThumb: 'url2' },
        { idDrink: 3, strDrink: 'Bloody Mary', strCategory: 'Cocktail', strDrinkThumb: 'url3' },
        { idDrink: 4, strDrink: 'Lemonade', strCategory: 'Non-Alcoholic', strDrinkThumb: 'url4' },
        { idDrink: 5, strDrink: 'Iced Tea', strCategory: 'Non-Alcoholic', strDrinkThumb: 'url5' },
        { idDrink: 6, strDrink: 'Soda', strCategory: 'Non-Alcoholic', strDrinkThumb: 'url6' },
        { idDrink: 7, strDrink: 'Masala Chai', strCategory: 'Non-Alcoholic', strDrinkThumb: 'url7' }
    ] as unknown as Drink[];

    it('should sort drinks alphabetically', () => {
        const sortedDrinks = DrinkHierarchy.sort(drinks) as Drink[];
        const drinkNames = sortedDrinks.map(drink => drink.strDrink);
        expect(drinkNames).toEqual([
            'Bloody Mary',
            'Iced Tea',
            'Lemonade',
            'Margarita',
            'Masala Chai',
            'Mojito',
            'Soda'
        ]);
    });

    it('should only include drinks that match the search query', () => {
        const searchQuery = 'Ma';
        const filteredDrinks = DrinkHierarchy.filterToStartWithQuery(drinks, searchQuery) as Drink[];
        const drinkNames = filteredDrinks.map(drink => drink.strDrink);
        expect(drinkNames).toEqual(['Margarita', 'Masala Chai']);
    });

    it('should include drinks that match the search query regardless of case', () => {
        const searchQuery = 'mA';
        const filteredDrinks = DrinkHierarchy.filterToStartWithQuery(drinks, searchQuery) as Drink[];
        const drinkNames = filteredDrinks.map(drink => drink.strDrink);
        expect(drinkNames).toEqual(['Margarita', 'Masala Chai']);
    });

    it('should return an empty array if no drinks are provided', () => {
        const searchQuery = 'Margarita';
        const filteredDrinks = DrinkHierarchy.filterToStartWithQuery([], searchQuery) as Drink[];
        expect(filteredDrinks).toEqual([]);
    });

    it('should return an empty array the search query does not exist', () => {
        const filteredDrinks = DrinkHierarchy.filterToStartWithQuery(drinks, '') as Drink[];
        expect(filteredDrinks).toEqual([]);
    });
});