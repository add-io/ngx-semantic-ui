import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'dropdown-docs',
    templateUrl: './dropdown-docs.component.html'
})
export class DropDownDocsComponent implements OnInit {

    selectValue: number;
    searchDropdown: string;
    multipleSelectValue: string[];
    multipleSearchSelectValue: string[];
    specialSelectValue: string[] = ["af"];

    constructor() {
    }

    ngOnInit() {
    }

    printMulti() {
        return JSON.stringify(this.multipleSelectValue, null, 2);
    }

    stringify(obj: any) {
        return JSON.stringify(obj);
    }
}
