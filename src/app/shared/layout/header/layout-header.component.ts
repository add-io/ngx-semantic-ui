/**
 * Created by bradleybrandon on 4/21/17.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'layout-header',
    templateUrl: 'layout-header.component.html',
})
export class LayoutHeaderComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }


}