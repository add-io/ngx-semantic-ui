import { Component, HostBinding, ViewChild } from "@angular/core";
import { BarProgressLabelComponent } from "./bar-progress-label.component";

@Component({
    selector: ".bar",
    template: "<ngx-bar-progress-label class='progress'></ngx-bar-progress-label>"
})
export class BarComponent {

    /**
     * The underlining percentage width of the bar.
     */
    private _width: string;
    /**
     * The type of label that should be rendered.
     */
    private _labelType: string;
    /**
     * Getter and setter to calculate what type of label should be renderer.
     */
    get labelType(): string {
        return this._labelType;
    }
    set labelType(type: string) {
        this._labelType = type;
        if (this.label !== undefined) {
            this.label.showPercent = type !== "none";
        }
    }
    /**
     * Getter and setter to determine the width of the progress bar.
     */
    @HostBinding("style.width")
    get width(): string|boolean {
        return this._width === undefined ? false : this._width;
    }
    set width(width: string|boolean) {
        if (this.label !== undefined) {
            this.label.percent = <string>width;
        }
        this._width = <string>width;
    }
    /**
     * The underlining label attached to this bar.
     */
    @ViewChild(BarProgressLabelComponent) label: BarProgressLabelComponent;
}
