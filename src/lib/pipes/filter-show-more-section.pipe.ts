import { Pipe, PipeTransform } from '@angular/core';
import { FilterControl } from '../models/filter-control-input.model';

@Pipe({
  name: 'filterShowMoreSection'
})
export class FilterShowMoreSectionPipe implements PipeTransform {

  transform(filterControls: FilterControl<unknown>[], showMoreValue: boolean, ...args: unknown[]): FilterControl<unknown>[] {
    return filterControls?.filter(control => (control?.options?.isShowMoreSection || false) === showMoreValue);
  }

}
