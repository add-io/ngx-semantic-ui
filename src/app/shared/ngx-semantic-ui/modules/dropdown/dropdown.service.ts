import { Injectable } from "@angular/core";
import { DropdownSelectionDirective } from "./dropdown-selection.directive";

@Injectable()
export class DropdownService {

    private selections: DropdownSelectionDirective[];

    constructor() {
        this.selections = [];
    }

    addSelection(selection: DropdownSelectionDirective) {
        if (this.selections.indexOf(selection) === -1) {
            this.selections.push(selection);
        }
    }

    removeSelection(selection: DropdownSelectionDirective) {
        if (this.selections.indexOf(selection) > -1) {
            this.selections.splice(this.selections.indexOf(selection), 1);
        }
    }

    hideAll(exludeSelection?: DropdownSelectionDirective) {
        for(let i = 0; i < this.selections.length; ++i) {
            if (this.selections[i] !== exludeSelection) {
                if (this.selections[i].isOpen) {
                    this.selections[i].isOpen = false;
                }
            }
        }
    }
}
