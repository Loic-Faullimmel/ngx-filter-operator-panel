import { Component, Inject, Input } from '@angular/core';
import { FilterControl } from '../../models/filter-control-input.model';
import { FilterOperatorMessages, IFilterOperatorMessages } from '../../models/filter-operator-messages.model';
import {
  ContainFilter,
  EqualFilter,
  MinMaxFilter
} from '../../models/filter-operator.model';

/**
 * Layout component that redirect to the corresponding derived filter control component.
 */
@Component({
    selector: 'app-filter-control',
    templateUrl: './filter-control.component.html',
    styleUrls: ['./filter-control.component.scss'],
})
export class FilterControlComponent<T> {
    @Input() filterControl: FilterControl<T>;

    messages: FilterOperatorMessages;

    constructor(
        @Inject("FILTER_OPERATOR_TRANSLATIONS")
        public readonly translations: Partial<IFilterOperatorMessages>
    ) {
      this.messages = new FilterOperatorMessages(translations);
    }

    isTextEmpty(value: any): boolean {
        return value == null || value === '';
    }
    isFilterEmpty(): boolean {
        return this.filterControl.properties?.size === 0;
    }

    isLabelType(): boolean {
        return (
            this.filterControl.filter instanceof EqualFilter ||
            this.filterControl.filter instanceof ContainFilter
        );
    }
    isRangeType(): boolean {
        return this.filterControl.filter instanceof MinMaxFilter;
    }
}
