/**
 * Created by webappaloosa on 4/21/17.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subscription} from "rxjs/Rx"
import {LayoutService} from "../../layout.service";

@Component({
    selector: 'menu-toggle',
    templateUrl: 'menu-toggle.component.html'
})

export class MenuToggleComponent implements OnInit, OnDestroy {
    menuCollapsed: boolean;

    private layoutSubscription: Subscription;

    constructor( private layoutSvc: LayoutService){

    }

    ngOnInit(): void{
        this.layoutSubscription = this.layoutSvc.subscribe((store)=> {
            this.menuCollapsed = store.menuCollapsed;
        });
    }

    toggleNavMenu() {
        this.menuCollapsed = !this.menuCollapsed;
        this.layoutSvc.toggleNavMenu()
    }

    ngOnDestroy(): void {
        this.layoutSubscription.unsubscribe();
    }
}
