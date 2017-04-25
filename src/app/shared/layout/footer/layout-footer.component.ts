/**
 * Created by webappaloosa on 4/23/17.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'layout-footer',
    templateUrl: 'layout-footer.component.html',
})
export class LayoutFooterComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }


}