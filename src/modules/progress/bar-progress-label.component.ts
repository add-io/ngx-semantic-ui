import { Component } from "@angular/core";

@Component({
    selector: "ngx-bar-progress-label.progress",
    template: "{{showPercent ? percent : ''}}"
})
export class BarProgressLabelComponent {

    /**
     * The percentage label that should be displayed on the screen.
     */
    percent: string;
    /**
     * If the percent should be shown on the screen.
     */
    showPercent: boolean = true;
}
