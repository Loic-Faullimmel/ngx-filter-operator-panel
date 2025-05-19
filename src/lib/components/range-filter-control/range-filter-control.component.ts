import { Component, Input, OnInit } from '@angular/core';
import { FilterControl } from '../../models/filter-control-input.model';

/**
 * Range filter control specific to the `MinMaxFilter` filter.
 */
@Component({
    selector: 'app-range-filter-control',
    templateUrl: './range-filter-control.component.html',
    styleUrls: ['./range-filter-control.component.scss'],
})
export class RangeFilterControlComponent<T> implements OnInit {
    @Input() filterControl: FilterControl<T>;

    constructor() {}

    public get rangeLow(): number {
        return this.filterControl.filter.inputs[0] || this.rangeFloor;
    }
    public set rangeLow(value: number) {
        this.filterControl.filter.inputs[0] = this.isFullSelection(
            value,
            this.rangeHigh
        )
            ? null
            : value;
    }

    public get rangeHigh(): number {
        return this.filterControl.filter.inputs[1] || this.rangeCeil;
    }
    public set rangeHigh(value: number) {
        this.filterControl.filter.inputs[1] = this.isFullSelection(
            this.rangeLow,
            value
        )
            ? null
            : value;
    }

    rangeFloor: number;
    rangeCeil: number;

    ngOnInit(): void {
        this.rangeFloor = Math.min(...this.filterControl?.properties);
        this.rangeCeil = Math.max(...this.filterControl?.properties);
    }

    /**
     * Check whether the selection filled the range.
     * @description means that the low/high input selection equals to the range floor/ceil.
     */
    private isFullSelection(low: number, high: number): boolean {
        return (
            (low === this.rangeFloor || low == null) &&
            (high === this.rangeCeil || high == null)
        );
    }
}
