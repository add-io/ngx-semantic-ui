import { Directive, Input, ContentChild, HostBinding, AfterContentInit } from "@angular/core";
import { BarComponent } from "./bar.component";
import { CommonService } from "../common.service";

@Directive({ selector: ".ui.progress" })
export class ProgressDirective implements AfterContentInit {

    /**
     * The progress number of this progress bar.
     */
    private _progress: number;
    /**
     * The type of label that should be used to define this progress directive.
     */
    private _labelType: string;
    /**
     * If the success class sould be added automatically.
     */
    @Input("autoSuccess") autoSuccess: any = true;
    /**
     * The basic total that should be used when rendering this total.
     */
    @Input("total") total: any;
    /**
     * The label that should be displayed to the screen.
     */
    @Input("label")
    set labelType(type: string) {
        this._labelType = type;
        if (this.bar !== undefined) {
            this.bar.labelType = type;
        }
    }
    get labelType(): string {
        return this._labelType;
    }
    /**
     * The progress that should be rendered for the bar.
     */
    @Input("progress")
    set progess(progress: number) {
        progress = CommonService.clamp(progress, 0, this.totalAllowed);
        if (this.bar !== undefined) {
            this.bar.width = Math.round((progress / this.totalAllowed) * 100) + "%";
        }
        this._progress = progress;
    }
    get progress(): number {
        return this._progress;
    }
    /**
     * The total allowed that should be used when calculating the percent.
     */
    get totalAllowed(): number {
        let total = parseInt(this.total);
        return Number.isNaN(total) ? 100 : total;
    }
    /**
     * The underlining bar element that we need to update.
     */
    @ContentChild(BarComponent) bar: BarComponent;
    /**
     * Getter to calculate the data-percent for the underlining css.
     */
    @HostBinding("attr.data-percent")
    get percent(): number {
        return Math.round((this._progress / this.totalAllowed) * 100);
    }
    /**
     * The getter to determine if the success class should be added.
     */
    @HostBinding("class.success")
    get success(): boolean {
        return CommonService.checkBooleanType(this.autoSuccess) ? this._progress === this.totalAllowed : false;
    }

    /**
     * Workflow class to make sure the label type is added to the underlining bar element.
     */
    ngAfterContentInit() {
        if (this.bar !== undefined) {
            this.bar.labelType = this.labelType == undefined ? "percent" : this.labelType;
        }
    }
}
