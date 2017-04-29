export interface IDropdownProcessor {
    /**
     * Workflow callback that will be called after content is initilized.
     */
    ngAfterContentInit(): void;
    /**
     * Workflow callback that will be called when the processor is destroyed.
     */
    ngOnDestroy(): void;
    /**
     * Helper method that will be called if this processor needs to deal with a default value.
     */
    initilizeValue(value: any|any[]): void;
    /**
     * Helper method that will be called when the event to trigger this element has been called.
     */
    trigger(event: MouseEvent): void;
    /**
     * Helper method to open this dropdown element.
     */
    open(): void;
    /**
     * Helper method to close this dropdown element.
     */
    close(): void;
}
