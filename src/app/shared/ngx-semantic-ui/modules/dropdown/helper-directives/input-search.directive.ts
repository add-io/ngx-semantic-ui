import { Directive } from "@angular/core";

@Directive({ selector: "input.search" })
export class InputSearchDirective {
    constructor() {
        console.log("Input search created");
    }
}
