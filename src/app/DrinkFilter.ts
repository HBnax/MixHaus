import { IFilterStrategy } from './IFilterStrategy';
import { Drink } from './Drink';

type FilterStrategy = {
    strategy: IFilterStrategy;
    filterStr: string;
}

export class DrinkFilter {
    private filterStrategies: FilterStrategy[] = [];

    constructor() {
        this.filterStrategies = [];
    }
    
    addFilterStrategy(strategy: IFilterStrategy, filterStr: string): void {
        this.filterStrategies.push({ strategy, filterStr });
    }

    removeFilterStrategy(filterStr: string): void {
        this.filterStrategies = this.filterStrategies.filter(s => s.filterStr !== filterStr);
    }

    clearFilterStrategies(): void {
        this.filterStrategies = [];
    }
    
    public filter(drinkList: Drink[]): Drink[] {
        if (this.filterStrategies.length === 0)
            return drinkList;
        return this.filterUniquely(drinkList);
    }

    private filterUniquely(drinkList: Drink[]): Drink[] {
        const uniqueDrinks = new Map<string, Drink>();
        for (const filterStrategy of this.filterStrategies) {
            const result = filterStrategy.strategy.filter({ drinks: drinkList }, filterStrategy.filterStr);
            if (result.drinks) {
                result.drinks.forEach(drink => {
                    if (!uniqueDrinks.has(drink.idDrink)) {
                        uniqueDrinks.set(drink.idDrink, drink);
                    }
                });
            }
        }
        return Array.from(uniqueDrinks.values());
    }
}