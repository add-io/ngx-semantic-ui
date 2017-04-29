import { Directive, ContentChild, forwardRef, ElementRef, Renderer2, Input } from "@angular/core";

import { MenuDirective } from "./menu.directive";
import { InputDirective } from "./input.directive";

@Directive({ selector: ".item", host: { "[class.filtered]": "isFiltered" } })
export class ItemDirective {

    private transition: string = "slide down";
    private duration: number = 400;

    @Input("value") value: string;
    @Input("class") klass: string;

    get isSearchInput(): boolean {
        return this.klass.indexOf("search") > -1 && this.klass.indexOf("input") > -1;
    }

    get label(): string {
        return this._element.nativeElement.innerHTML;
    }

    get text(): string {
        return this._element.nativeElement.innerText;
    }

    public isFiltered: boolean = false;

    private _hasMouseEntered: boolean = false;

    @ContentChild(forwardRef(() => MenuDirective)) menu: MenuDirective;
    @ContentChild(forwardRef(() => InputDirective)) input: InputDirective;

    get hasMenu(): boolean {
        return this.menu != null;
    }

    get element(): ElementRef {
        return this._element;
    }

    constructor(private _element: ElementRef, private _renderer: Renderer2) {
    }

    initializeItemMenu(transition: string, duration: number) {
        this.transition = transition;
        this.duration = duration;

        this.bindItem();
        this.menu.initializeMenu(transition, duration);
    }

    private bindItem() {
        this._renderer.listen(this._element.nativeElement, "mouseenter", () => {
            this._hasMouseEntered = true;
            if (this.menu.hidden) {
                this.menu.open(this.transition, this.duration);
            }
        });
        this._renderer.listen(this._element.nativeElement, "mouseleave", () => {
            this._hasMouseEntered = false;
            setTimeout(() => {
                if (!this._hasMouseEntered && this.menu.visible) {
                    this.menu.close(this.transition, this.duration);
                }
            }, 100);
        });
    }
}
