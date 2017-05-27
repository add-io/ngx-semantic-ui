import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonService } from "../common.service";

@Component({
    selector: ".ui.rating",
    template: "<i class='icon' *ngFor='let rating of ratings' [class.active]='score >= rating' [class.selected]='hoverScore >= rating' (click)='selectRating(rating)' (mouseenter)='mouseenterRating(rating)' (mouseleave)='mouseleaveRating(rating)'></i>"
})
export class RatingComponent {

    /**
     * The internal value representing how many icons should be lit up.
     */
    score: number = 0;
    /**
     * The internal value representing how many icons should be hovering.
     */
    hoverScore: number = 0;
    /**
     * The amount of rating icons that should be displayed.
     */
    @Input("rating") ratingString: any;
    /**
     * If the rating set is clearable or not.
     */
    @Input("clearable") clearable: boolean|string|number;
    /**
     * Event that will be fired when a change occurs.
     */
    @Output("change") onChange: EventEmitter<number> = new EventEmitter<number>();
    /**
     * Event that will occur whent he dropdown is closed.
     */
    @Output("blur") onBlur: EventEmitter<void> = new EventEmitter<void>();
    /**
     * Getter to get an array of elments based on the rating given.
     */
    get ratings(): number[] {
        let rating = parseInt(this.ratingString);
        let items: number[] = [];
        for(let i = 0; i < (Number.isNaN(rating) ? 4 : rating); ++i) {
            items.push(i + 1);
        }
        return items;
    }
    /**
     * Getter to determine if this component is clearable or not.
     */
    get isClearable(): boolean {
        return this.clearable === undefined ? true : CommonService.checkBooleanType(this.clearable);
    }

    /**
     * Method is meant to select a rating from the user.
     *
     * @param rating The rating that was selected by the user.
     */
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

    /**
     * Method is meant to clear the score.
     */
    clear() {
        if (this.score != 0) {
            this.score = 0;
            this.onChange.emit(0);
        }
    }

    /**
     * Method is meant to deal with hovering over the rating icons.
     *
     * @param rating The rating that is hovering by the user.
     */
    mouseenterRating(rating: number) {
        this.hoverScore = rating;
    }

    /**
     * Method is meant to deal with hovering over the rating icons.
     *
     * @param rating The rating that is hovering by the user.
     */
    mouseleaveRating(rating: number) {
        this.hoverScore = -1;
        this.onBlur.emit();
    }
}
