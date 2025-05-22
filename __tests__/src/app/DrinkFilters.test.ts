import { DrinkFilters } from '../../../src/app/DrinkFilters';

describe('DrinkFilters', () => {
    let drinkFilters : DrinkFilters;

    beforeEach(async () => {
        drinkFilters = new DrinkFilters();
        await drinkFilters.populateFilters();
    });

    test('should get the alcoholic filters from the api', () => {
        const alcoholicFilters = ['Alcoholic', 'Non alcoholic', 'Optional alcohol'];
        expect(drinkFilters.getAlcoholicFilters().map(filter => filter.name)).toEqual(alcoholicFilters);
    });

    test('should get the category filters from the api', () => {
        const categoryFilters = [
            'Cocktail',
            'Ordinary Drink',
            'Punch / Party Drink',
            'Shake',
            'Other / Unknown',
            'Cocoa',
            'Shot',
            'Coffee / Tea',
            'Homemade Liqueur',
            'Beer',
            'Soft Drink'
        ];
        expect(drinkFilters.getCategoryFilters().map(filter => filter.name)).toEqual(categoryFilters);
    });

    test('should get all filters from the api', () => {
        const allFilters = [
            'Alcoholic',
            'Non alcoholic',
            'Optional alcohol',
            'Cocktail',
            'Ordinary Drink',
            'Punch / Party Drink',
            'Shake',
            'Other / Unknown',
            'Cocoa',
            'Shot',
            'Coffee / Tea',
            'Homemade Liqueur',
            'Beer',
            'Soft Drink'
        ];
        expect(drinkFilters.getAllFilters().map(filter => filter.name)).toEqual(allFilters);
    });
});