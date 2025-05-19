import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterBoardComponent } from './components/filter-board/filter-board.component';
import { FilterControlComponent } from './components/filter-control/filter-control.component';
import { FilterLabelCheckboxComponent } from './components/label-filter-control/filter-label-checkbox/filter-label-checkbox.component';
import { LabelFilterControlComponent } from './components/label-filter-control/label-filter-control.component';
import { RangeFilterControlComponent } from './components/range-filter-control/range-filter-control.component';
import {
	IFilterOperatorMessages
} from './models/filter-operator-messages.model';
import { FilterShowMoreSectionPipe } from './pipes/filter-show-more-section.pipe';

@NgModule({
    declarations: [
        FilterBoardComponent,
        FilterControlComponent,
        RangeFilterControlComponent,
        LabelFilterControlComponent,
        FilterLabelCheckboxComponent,
				FilterShowMoreSectionPipe,
    ],
    imports: [NgbModalModule, NgxSliderModule, FormsModule, CommonModule],
    exports: [
        FilterBoardComponent,
        FilterControlComponent,
        RangeFilterControlComponent,
        LabelFilterControlComponent,
        FilterLabelCheckboxComponent,
    ],
})
export class NgxFilterOperatorPanelModule {
    static forRoot(
        translations: Partial<IFilterOperatorMessages>
    ): ModuleWithProviders<NgxFilterOperatorPanelModule> {
        return {
            ngModule: NgxFilterOperatorPanelModule,
            providers: [
                {
                    provide: 'FILTER_OPERATOR_TRANSLATIONS',
                    useValue: translations,
                },
            ],
        };
    }
}
