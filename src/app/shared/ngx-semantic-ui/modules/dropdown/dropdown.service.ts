import { Injectable } from "@angular/core";
import { IDropdownProcessor } from "./processors";

@Injectable()
export class DropdownService {

    private processors: IDropdownProcessor[];

    constructor() {
        this.processors = [];
    }

    add(processor: IDropdownProcessor) {
        if (this.processors.indexOf(processor) === -1) {
            this.processors.push(processor);
        }
    }

    remove(processor: IDropdownProcessor) {
        if (this.processors.indexOf(processor) > -1) {
            this.processors.splice(this.processors.indexOf(processor), 1);
        }
    }

    hideAll(excludeItem?: IDropdownProcessor) {
        for(let i = 0; i < this.processors.length; ++i) {
            if (this.processors[i] !== excludeItem) {
                this.processors[i].close();
            }
        }
    }
}
