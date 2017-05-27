import { Injectable } from "@angular/core";
import { ModalComponent } from "./modal.component";

@Injectable()
export class ModalService {

    /**
     * A list of all the active modals.
     */
    private modals: ModalComponent[];
    /**
     * Getter for the first modal in the stack.
     */
    get first(): ModalComponent {
        return this.modals.length == 0 ? null : this.modals[this.modals.length - 1];
    }
    /**
     * Getter for the last modal in the stack.
     */
    get last(): ModalComponent {
        return this.modals.length == 0 ? null : this.modals[0];
    }
    /**
     * Getter to determine if there is an active modal.
     */
    get hasActiveModal(): boolean {
        return this.modals.length > 0;
    }

    /**
     * Constructor to deal with building out the modal stack.
     */
    constructor() {
        this.modals = [];
    }

    /**
     * Push a modal onto the stack.
     *
     * @param modal The modal that needs to be pushed onto the stack.
     * @param hideCurrent If the current modal needs to be hidden or not.
     */
    push(modal: ModalComponent, hideCurrent: boolean = false) {
        if (this.first !== null && hideCurrent) {
            this.first.hide();
        }
        this.modals.push(modal);
        modal.show();
    }

    /**
     * Pop a modal from the stack.
     */
    pop() {
        let modal = this.modals.pop();
        modal.hide();
        if (this.first != null && this.first.isHidden) {
            this.first.show();
        }
    }

    /**
     * Clear the modal stack and hide all the modals in the stack.
     */
    clearModals() {
        for(let i = 0; i < this.modals.length; ++i) {
            this.modals[i].isActive = false;
            if (!this.modals[i].isHidden) {
                this.modals[i].hide();
            }
        }

        this.modals = [];
    }
}
