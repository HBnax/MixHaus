import { Database } from '../../../src/app/Database';

describe('Database', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if the network response is not ok', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: async () => ({})
        } as Response);

        await expect(Database.getCocktailsByName('InvalidName')).rejects.toThrow('Network response was not ok');
    });

    it('should fetch cocktails by name', async () => {
        const result = await Database.getCocktailsByName('Margarita') as { drinks: { strDrink: string }[] };
        expect(result.drinks[0]).toHaveProperty('strDrink', 'Margarita');
    });

    it('should fetch cocktails by id', async () => {
        const result = await Database.getCocktailsById('11007') as { drinks: { strDrink: string }[] };
        expect(result.drinks[0]).toHaveProperty('idDrink', '11007');
    });

    it('should fetch ingredients by name', async () => {
        const result = await Database.getIngredientByName('vodka') as { ingredients: { strIngredient: string }[] };
        expect(result.ingredients[0]).toHaveProperty('strIngredient', 'Vodka');
    });

    it('should fetch ingredients by id', async () => {
        const result = await Database.getIngredientById('552') as { ingredients: { idIngredient: string }[] };
        expect(result.ingredients[0]).toHaveProperty('idIngredient', '552');
    });

    it('should fetch alcoholic drinks', async () => {
        const result = await Database.getByAlcoholic(true) as { drinks: { strDrink: string }[] };
        expect(result.drinks.some(drink => drink.strDrink === 'Aperol Spritz')).toBe(true);
    });

    it('should fetch non-alcoholic drinks', async () => {
        const result = await Database.getByAlcoholic(false) as { drinks: { strDrink: string }[] };
        expect(result.drinks.some(drink => drink.strDrink === 'Strawberry Lemonade')).toBe(true);
    });

    it('should fetch by category', async () => {
        const result = await Database.getByCategory('Soft Drink') as { drinks: { strDrink: string }[] };
        expect(result.drinks.some(drink => drink.strDrink === 'California Root Beer')).toBe(true);
    });

    it('should fetch a list of categories', async () => {
        const result = await Database.getCategories() as { drinks: { strCategory: string }[] };
        expect(result.drinks.some(drink => drink.strCategory === 'Ordinary Drink')).toBe(true);
    });

    it('should fetch a list of ingredients', async () => {
        const result = await Database.getIngredients() as { drinks: { strIngredient1: string }[] };
        expect(result.drinks.some(drink => drink.strIngredient1 === 'Vodka')).toBe(true);
    });

    it('should fetch by a list of ingredients', async () => {
        const ingredients = ['Tequila', 'Lime juice'];
        const result = await Database.getCocktailsByIngredients(ingredients) as { drinks: { strDrink: string }[] };
        expect(result.drinks.some(drink => drink.strDrink === 'Margarita')).toBe(true);
    });
});
