import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    template: ''
})
export class Unsubscriber implements OnDestroy {
    private _subs: Subscription[] = [];

    get subs(): Subscription[] {
        return this._subs;
    }

    set subs(subscription: Subscription) {
        this._subs.push(subscription);
    }

    ngOnDestroy(): void {
        this._subs.forEach(sub => sub.unsubscribe());
    }
}
