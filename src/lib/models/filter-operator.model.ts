// Abstract

/**
 * Operator to apply filters to an given object type.
 * @param filterableProperties The object properties to be matched.
 * @param inputs The input properties to match with, unique set of values.
 */
export abstract class FilterOperator<T> {
    constructor(
        public filterableProperties: (obj: T) => any[],
        public inputs: any[]
    ) {}
    abstract apply(obj: T): boolean;
}

// Implementations

/**
 * @description Case sensitive matching. If inputs are null it returns true.
 */
export class EqualFilter<T> extends FilterOperator<T> {
    constructor(filterableProperties: (obj: T) => any[], inputs = []) {
        super(filterableProperties, inputs);
    }
    apply(obj: T): boolean {
        if (!this.inputs?.length) {
            return true;
        }
        return [...this.filterableProperties(obj)].some(
            (property) => this.inputs.indexOf(property) != -1
        );
    }
}

/**
 * @description Case sensitive matching. If inputs are null or empty it returns true.
 */
export class ContainFilter<T> extends FilterOperator<T> {
    constructor(filterableProperties: (obj: T) => any[], inputs = []) {
        super(filterableProperties, inputs);
    }
    apply(obj: T): boolean {
        if (!this.inputs?.length) {
            return true;
        }
        return this.inputs.some(
            (input) => input?.length == 0 ||
                [...this.filterableProperties(obj)].some(
                    (prop) => prop?.toString().includes(input) || false
                )
        );
    }
}

/**
 * @param inputs array that must contains 2 elements as this `[min, max]`
 */
export class MinMaxFilter<T> extends FilterOperator<T> {
    constructor(
        filterableProperties: (obj: T) => number[],
        inputs = [null, null]
    ) {
        super(filterableProperties, inputs);
    }
    apply(obj: T): boolean {
        if (!this.inputs?.length) {
            return true;
        }
        const min = this.inputs[0];
        const max = this.inputs[1];
        if (min == null || max == null) {
            return true;
        }
        return [...this.filterableProperties(obj)].some(
            (prop) => min <= prop && prop <= max
        );
    }
}
