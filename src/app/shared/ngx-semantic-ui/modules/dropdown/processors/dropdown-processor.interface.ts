export interface IDropdownProcessor {
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    initilizeValue(value: any|any[]): void;
    trigger(event: MouseEvent): void;
    open(): void;
    close(): void;
}
