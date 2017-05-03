/**
 * Created by terry on 4/21/17.
 */
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'rating-docs',
    templateUrl: './rating-docs.component.html'
})
export class RatingDocsComponent implements OnInit {

    basicRating: number = 1;

    constructor() {
    }

    ngOnInit() {
    }

}
