import { isObservable, Observable } from 'rxjs';

/**
 * Lib messages.
 */
export interface IFilterOperatorMessages {
    reset: string | Observable<string>;
    apply: string | Observable<string>;
    all: string | Observable<string>;
    unavailableFilter: string | Observable<string>;
		showMore: string | Observable<string>;
    showLess: string | Observable<string>;
}

export class FilterOperatorMessages implements IFilterOperatorMessages {
    constructor(options?: Partial<IFilterOperatorMessages>) {
        this.setMessage('reset', options?.reset);
        this.setMessage('apply', options?.apply);
        this.setMessage('all', options?.all);
        this.setMessage('unavailableFilter', options?.unavailableFilter);
        this.setMessage('showMore', options?.showMore);
        this.setMessage('showLess', options?.showLess);
    }

    // Default messages
    reset: string = 'Reset';
    apply: string = 'Apply';
    all: string = 'All';
    unavailableFilter: string = 'No filter available.';
    showMore: string = 'Show more';
    showLess: string = 'Show less';

    // Setter for sync or async input.
    private setMessage(
        key: keyof FilterOperatorMessages,
        value: string | Observable<string>
    ): void {
        if (isObservable(value)) {
            value.subscribe((translatedValue: string) => {
                this[key] = translatedValue;
            });
        } else if (value !== undefined) {
            this[key] = value;
        }
    }
}
