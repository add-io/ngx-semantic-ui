import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonService } from "../common.service";

@Component({
    selector: ".ui.rating",
    template: "<i class='icon' *ngFor='let rating of ratings' [class.active]='score >= rating' [class.selected]='hoverScore >= rating' (click)='selectRating(rating)' (mouseenter)='mouseenterRating(rating)' (mouseleave)='mouseleaveRating(rating)'></i>"
})
export class RatingComponent {

    score: number = 0;
    hoverScore: number = 0;

    @Input("rating") ratingString: any;
    @Input("clearable") clearable: boolean|string|number;

    /**
     * Event that will be fired when a change occurs.
     */
    @Output("change") onChange: EventEmitter<number> = new EventEmitter<number>();
    /**
     * Event that will occur whent he dropdown is closed.
     */
    @Output("blur") onBlur: EventEmitter<void> = new EventEmitter<void>();

    get ratings(): number[] {
        let rating = parseInt(this.ratingString);
        let items: number[] = [];
        for(let i = 0; i < (Number.isNaN(rating) ? 0 : rating); ++i) {
            items.push(i + 1);
        }
        return items;
    }

    get isClearable(): boolean {
        return this.clearable === undefined ? true : CommonService.checkBooleanType(this.clearable);
    }

    selectRating(rating: number) {
        if (this.isClearable) {
            this.score = this.score === rating ? 0 : rating;
            this.onChange.emit(this.score);
        } else {
            if (this.score != rating) {
                this.onChange.emit(rating);
            }
            this.score = rating;
        }
    }

    clear() {
        if (this.score != 0) {
            this.score = 0;
            this.onChange.emit(0);
        }
    }

    mouseenterRating(rating: number) {
        this.hoverScore = rating;
    }

    mouseleaveRating(rating: number) {
        this.hoverScore = -1;
        this.onBlur.emit();
    }
}
