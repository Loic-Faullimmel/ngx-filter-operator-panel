import { Observable, Subject } from 'rxjs';
import { FilterOperator } from '../models/filter-operator.model';

/**
 * List filtering factory, it handle filters to apply into his items that are in type `T`.
 */
export class FilterFactory<T> {
    constructor(allItems: T[]) {
        this.filters = new Set<FilterOperator<T>>();
        this.filteredItems = [];
        this._allItems = allItems;
    }

    private readonly filters: Set<FilterOperator<T>>;

    // Initial items
    private _allItems: T[];
    private get allItems(): T[] {
        return this._allItems;
    }
    private set allItems(value: T[]) {
        this._allItems = value;
    }

    // Filtered items
    private _filteredItems: T[];
    private get filteredItems(): T[] {
        return this._filteredItems;
    }
    private set filteredItems(value: T[]) {
        this.filteredItemsSource.next(value);
        this._filteredItems = value;
    }
    // Observable source & stream
    private readonly filteredItemsSource = new Subject<T[]>();
    public readonly filteredItems$: Observable<T[]> =
        this.filteredItemsSource.asObservable();

    /**
     * Set initial list of items.
     * @description
     * Then all filters are implicitly applied to the filtered list.
     */
    setItems(value: T[]): void {
        this.allItems = value;
        this.applyFilters();
    }
    /**
     * Get filtered list of items.
     */
    getFilteredItems(): T[] {
        return this._filteredItems;
    }
    /**
     * Add a filter to apply to all items.
     * @description
     * Then all filters are implicitly applied to the filtered list.
     */
    addFilters(filters: FilterOperator<T>[]): void {
        filters?.forEach((filter) => this.filters.add(filter));
        this.applyFilters();
    }
    /**
     * Remove a filter that has been added before.
     * @description
     * Then all filters are implicitly applied to the filtered list.
     */
    removeFilters(filters: FilterOperator<T>[]): void {
        filters?.forEach((filter) => this.filters.delete(filter));
        this.applyFilters();
    }
    /**
     * Delete all filters that have been added.
     * @description
     * Then all filters are implicitly applied to the filtered list.
     */
    clearFilters(): void {
        this.filteredItems = this.allItems;
        this.filters.clear();
        this.applyFilters();
    }
    /**
     * Clear all filters input values.
     * @description
     * Then all filters are implicitly applied to the filtered list.
     */
    clearFiltersInputs(): void {
        this.filteredItems = this.allItems;
        this.filters.forEach((filter) => (filter.inputs = []));
        this.applyFilters();
    }
    /**
     * Count the total number of filter inputs.
     */
    countAppliedInputs(): number {
        let counter = 0;
        this.filters?.forEach((filter) => {
            filter?.inputs?.forEach((input) => {
                if (input != null) {
                    counter++;
                }
            });
        });
        return counter;
    }
    /**
     * Apply all filters to every items of the list.
     * @description Each item that have passed every filter will be added to the filtered list.
     */
    applyFilters(): void {
        this.filteredItems = this.allItems?.filter((item) =>
            this.satisfyAllFilters(item)
        );
    }
    // To be passed the item must satisfy at least one filter (OR condition between filters).
    private satisfySomeFilters(item: T): boolean {
        return [...this.filters].some((filter) => filter.apply(item));
    }
    // To be passed the item must satisfy all filters (AND condition between filters).
    private satisfyAllFilters(item: T): boolean {
        return [...this.filters].every((filter) => filter.apply(item));
    }

    /**
     * Extract all property values from the list that can be filtered.
     * Also removed falsy & duplicated ones.
     *
     * @param filter the filter we want to use to extract properties from the list.
     * @param transformFn transform property values function.
     * @returns A unique list of all available property values.
     */
    extractProperties(filter: FilterOperator<T>): Set<any> {
        let extractedProperties = [];

        this.allItems.forEach((obj) => {
            extractedProperties = extractedProperties.concat(
                filter.filterableProperties(obj)
            );
        });

        return new Set(extractedProperties.filter(prop => !!prop));
    }
}
