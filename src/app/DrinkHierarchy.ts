import { Drink } from "./Drink";

export class DrinkHierarchy {
    static sort(items: Drink[], searchQuery: (string | unknown) = void 0) {
        return this.filterToStartWithQuery(this.sortByName(items) || [], searchQuery);
    }

    static sortByName(items: Drink[]) {
        return items.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
    }
    
    static filterToStartWithQuery(items: Drink[], searchQuery: (string | unknown) = void 0) {
        if (typeof searchQuery !== 'string')
            return items;
        else if (searchQuery === '')
            return [];
        const lowerCaseQuery = searchQuery.toLowerCase();
        return items.filter(item => item.strDrink.toLowerCase().startsWith(lowerCaseQuery));
    }
}