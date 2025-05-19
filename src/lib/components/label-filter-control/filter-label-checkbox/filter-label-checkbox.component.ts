import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Filter label state checkbox.
 *
 * @param name label name text content.
 * @param checked checkbox state, by default is false.
 */
@Component({
    selector: 'app-filter-label-checkbox',
    templateUrl: './filter-label-checkbox.component.html',
    styleUrls: ['./filter-label-checkbox.component.scss'],
})
export class FilterLabelCheckboxComponent {
    @Input() title: string;
    @Input() checked = false;

    /**
     * Emit when the checkbox state changes.
     */
    @Output() checkEvent = new EventEmitter<boolean>();

    constructor() {}

    toggleEmit() {
        this.checkEvent.emit(this.checked);
    }
}
