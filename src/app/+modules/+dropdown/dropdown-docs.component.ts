import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'dropdown-docs',
    templateUrl: './dropdown-docs.component.html'
})
export class DropDownDocsComponent implements OnInit {

    selectValue: number;
    multipleSelectValue: string[];

    constructor() {
    }

    ngOnInit() {
    }

    printMulti() {
        return JSON.stringify(this.multipleSelectValue, null, 2);
    }
}
