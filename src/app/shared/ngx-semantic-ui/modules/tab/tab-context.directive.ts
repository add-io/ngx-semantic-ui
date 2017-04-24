import { Directive, Input } from "@angular/core";

@Directive({ selector: "[tabContext]" })
export class TabContextDirective {

    /**
     * The name of this context.
     */
    @Input("tabContext") name: string;

    /**
     * If this context should use history when triggering tabs.
     */
    @Input("history") history: boolean|string|number;

    /**
     * Getter that will determine if we need to track the history.
     */
    get trackHistory(): boolean {
        return this.history === "true"
            || this.history === true
            || this.history === "1"
            || this.history === 1;
    }
}
