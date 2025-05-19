import { FilterOperator } from "./filter-operator.model";

/**
 * Input model for `FilterControlComponent`.
 */
export class FilterControl<T> {
  title: string;
  filter: FilterOperator<T>;
  /**
   * Set of unique property labels to display.
   */
  properties?: Set<any>;
	options?: {
		isShowMoreSection?: boolean;
	}
}
