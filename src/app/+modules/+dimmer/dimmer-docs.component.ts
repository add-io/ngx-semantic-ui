import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'dimmer-docs',
    templateUrl: './dimmer-docs.component.html'
})
export class DimmerDocsComponent implements OnInit {

    saving: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    save() {
        this.saving = true;
        setTimeout(() => {
            this.saving = false;
        }, 2000);
    }
}
