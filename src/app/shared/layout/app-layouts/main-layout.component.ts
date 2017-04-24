/**
 * Created by bradleybrandon on 4/21/17.
 */
import {
    Component,
    OnInit,
    // AfterContentInit,
    OnDestroy
} from '@angular/core';

import {Subscription} from "rxjs/Rx";

import {LayoutService} from '../layout.service';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

    menuCollapsed: boolean;

    private layoutSubscription: Subscription;

    constructor(private layoutSvc: LayoutService) {

    }

    ngOnInit() {
        this.layoutSubscription = this.layoutSvc.subscribe((store) => {
            this.processLayout(store);
        });
    }

    private processLayout = (store) => {
        this.menuCollapsed = store.menuCollapsed;
    };


    ngOnDestroy() {
        this.layoutSubscription.unsubscribe();
    }
}
