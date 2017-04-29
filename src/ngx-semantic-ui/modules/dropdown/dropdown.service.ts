import { Injectable } from "@angular/core";
import { IDropdownProcessor } from "./processors";

@Injectable()
export class DropdownService {

    /**
     * The dropdown processors that exist on the page.
     */
    private processors: IDropdownProcessor[];

    /**
     * Constructore to initilize the processors.
     */
    constructor() {
        this.processors = [];
    }

    /**
     * Add a processor to the processor list so all of them can be controlled from one service.
     *
     * @param processor The processor that needs to be added to the processor list.
     */
    add(processor: IDropdownProcessor) {
        if (this.processors.indexOf(processor) === -1) {
            this.processors.push(processor);
        }
    }

    /**
     * Remove a processor fromt he processor list so it will not be controlled by this service.
     *
     * @param processor The processor that nees to be removed for the processor list.
     */
    remove(processor: IDropdownProcessor) {
        if (this.processors.indexOf(processor) > -1) {
            this.processors.splice(this.processors.indexOf(processor), 1);
        }
    }

    /**
     * Hide all the processors in the system.
     *
     * @param excludeItem The processor we do not care to hide.
     */
    hideAll(excludeItem?: IDropdownProcessor) {
        for(let i = 0; i < this.processors.length; ++i) {
            if (this.processors[i] !== excludeItem) {
                this.processors[i].close();
            }
        }
    }
}
