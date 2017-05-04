/**
 * Created by terry on 4/21/17.
 */
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'progress-docs',
    templateUrl: './progress-docs.component.html'
})
export class ProgressDocsComponent implements OnInit {

    private _standardProgress: number = 0;
    private _indicatingProgress: number = 0;
    private _attachTopProgress: number = 0;
    private _attachBottomProgress: number = 0;

    get standardProgress(): number {
        return this._standardProgress;
    }
    set standardProgress(num: number) {
        this._standardProgress = this.clamp(num);
    }
    get indicatingProgress(): number {
        return this._indicatingProgress;
    }
    set indicatingProgress(num: number) {
        this._indicatingProgress = this.clamp(num);
    }
    get attachTopProgress(): number {
        return this._attachTopProgress;
    }
    set attachTopProgress(num: number) {
        this._attachTopProgress = this.clamp(num);
    }
    get attachBottomProgress(): number {
        return this._attachBottomProgress;
    }
    set attachBottomProgress(num: number) {
        this._attachBottomProgress = this.clamp(num);
    }

    constructor() {
    }

    ngOnInit() {
    }

    increaseStandardProgress() {
        this.standardProgress += this.randomInt();
    }

    decreaseStandardProgress() {
        this.standardProgress -= this.randomInt();
    }

    increaseIndicatingProgress() {
        this.indicatingProgress += this.randomInt();
    }

    decreaseIndicatingProgress() {
        this.indicatingProgress -= this.randomInt();
    }

    increaseAttachedProgress() {
        this.attachTopProgress += this.randomInt();
        this.attachBottomProgress += this.randomInt();
    }

    decreaseAttachedProgress() {
        this.attachTopProgress -= this.randomInt();
        this.attachBottomProgress -= this.randomInt();
    }

    private clamp(item: number) {
        if (item < 0) return 0;
        if (item > 100) return 100;
        return item;
    }

    private randomInt() {
        return this.random(5, 20);
    }

    private random(min, max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}
