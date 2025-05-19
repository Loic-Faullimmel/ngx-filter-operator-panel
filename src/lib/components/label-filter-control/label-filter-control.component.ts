import { Component, Inject, Input } from '@angular/core';
import { FilterControl } from '../../models/filter-control-input.model';
import { FilterOperatorMessages, IFilterOperatorMessages } from '../../models/filter-operator-messages.model';

@Component({
    selector: 'app-label-filter-control',
    templateUrl: './label-filter-control.component.html',
    styleUrls: ['./label-filter-control.component.scss'],
})
export class LabelFilterControlComponent<T> {
    @Input() filterControl: FilterControl<T>;

    messages: FilterOperatorMessages;

    constructor(
        @Inject("FILTER_OPERATOR_TRANSLATIONS")
        public readonly translations: Partial<IFilterOperatorMessages>
    ) {
      this.messages = new FilterOperatorMessages(translations);
    }

    public isLabelChecked(property: string): boolean {
        return [...this.filterControl.filter.inputs]?.includes(property);
    }

    public toggleLabel(display: boolean, value: string): void {
        if (display) {
            this.filterControl.filter.inputs.push(value);
        } else {
            this.filterControl.filter.inputs =
                this.filterControl.filter.inputs.filter(
                    (input) => input != value
                );
        }
    }

    /**
     * Whether the whole property labels are checked or not.
     */
    public isAllLabelsChecked(): boolean {
        return [...this.filterControl.properties]?.every((property) =>
            this.isLabelChecked(property)
        );
    }

    /**
     * Toggle the whole set of filter property labels.
     *
     * @description if all labels are already checked: uncheck them all,
     * else if at least one label isn't checked: check them all.
     */
    public toggleAllLabels(): void {
        const toggleDisplay = this.isAllLabelsChecked() ? false : true;

        this.filterControl.properties?.forEach((property) =>
            this.toggleLabel(toggleDisplay, property)
        );
    }
}
