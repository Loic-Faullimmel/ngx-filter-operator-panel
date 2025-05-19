import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterControl } from '../../models/filter-control-input.model';
import { FilterOperatorMessages, IFilterOperatorMessages } from '../../models/filter-operator-messages.model';
import { FilterFactory } from '../../services/filter-factory.service';

@Component({
  selector: 'app-filter-board',
  templateUrl: './filter-board.component.html',
  styleUrls: ['./filter-board.component.scss'],
})
export class FilterBoardComponent<T> implements OnInit {
  @Input() title: string;
  @Input() filterFactory: FilterFactory<T>;
  @Input() filterControls: FilterControl<T>[];
  @Input() isLoading?: boolean;

  messages: FilterOperatorMessages;
  showShowMoreSection: boolean = false;

  get isAnyShowMoreControls(): boolean {
    return this.filterControls?.some(fc => fc.options?.isShowMoreSection === true);
  }

  constructor(
    @Inject('FILTER_OPERATOR_TRANSLATIONS')
    public readonly translations: Partial<IFilterOperatorMessages>,
    private readonly activeModal: NgbActiveModal
  ) {
    this.messages = new FilterOperatorMessages(translations);
  }

  ngOnInit(): void {
		const hasActiveShowMoreSection = this.filterControls
			?.filter(control => control.options?.isShowMoreSection)
			.some(control => control.filter?.inputs?.length > 0);

		if (hasActiveShowMoreSection) {
			this.showShowMoreSection = true;
		}
  }

  /**
   * Close the form modal (resolved action).
   */
  close = () => {
    this.activeModal.close();
  };

  /**
   * Create & emit all these label property filters to service.
   */
  submit = () => {
    this.filterFactory.applyFilters();
  };

  /**
   * Reset all these applied filters
   */
  reset = () => {
    this.filterFactory.clearFiltersInputs();
  };

  toggleShowMoreSection = () => {
    this.showShowMoreSection = !this.showShowMoreSection;
  };
}
