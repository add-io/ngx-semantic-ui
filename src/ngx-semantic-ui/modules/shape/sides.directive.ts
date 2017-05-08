import { Directive, ContentChildren, QueryList, HostBinding, ElementRef, Renderer2 } from "@angular/core";
import { SideDirective } from "./side.directive";

@Directive({ selector: ".sides" })
export class SidesDirective {

    /**
     * The duration that should be used for the animations.
     */
    duration: number = 500;
    /**
     * All the sides that this container deals with.
     */
    @ContentChildren(SideDirective) sides: QueryList<SideDirective>;
    /**
     * The underlining html element for this directive.
     */
    get element(): HTMLElement {
        return this._element.nativeElement;
    }
    /**
     * The content bounds for this directive.
     */
    get bounds(): ClientRect {
        return this.element.getBoundingClientRect();
    }

    /**
     * Constructor to get the element and renderer for this directive.
     *
     * @param _element The element of the underlining html.
     * @param _renderer The renderer to comunicate with the html.
     */
    constructor(private _element: ElementRef, private _renderer: Renderer2) {
    }

    /**
     * Method to process a up animation on this shape.
     */
    processUp(): Promise<void> {
        return this.processAnimation("up", [
            { transform: "translateY(0px) translateZ(0px)" },
            { transform: "translateY(" + (this.bounds.height / 2) + "px) translateZ(0px) rotateX(-90deg)" }
        ]);
    }

    /**
     * Method to process a down animation on this shape.
     */
    processDown(): Promise<void> {
        return this.processAnimation("down", [
            { transform: "translateY(0px) translateZ(0px)" },
            { transform: "translateY(" + (this.bounds.height / 2) + "px) translateZ(-" + this.bounds.height + "px) rotateX(90deg)" }
        ]);
    }

    /**
     * Method to process a left animation on this shape.
     */
    processLeft(): Promise<void> {
        return this.processAnimation("left", [
            { transform: "translateX(0px) translateZ(0px)" },
            { transform: "translateX(" + (this.bounds.width / 2) + "px) translateZ(0px) rotateY(90deg)" }
        ]);
    }

    /**
     * Method to process a right animation on this shape.
     */
    processRight(): Promise<void> {
        return this.processAnimation("right", [
            { transform: "translateX(0px) translateZ(0px)" },
            { transform: "translateX(" + (this.bounds.width / 2) + "px) translateZ(-" + this.bounds.width + "px) rotateY(-90deg)" }
        ]);
    }

    /**
     * Method to process a card flip animation on this shape.
     */
    processOver(): Promise<void> {
        return this.processAnimation("over", [
            { transform: "translateX(0px)" },
            { transform: "translateX(" + this.bounds.width + "px) rotateY(180deg)" }
        ]);
    }

    /**
     * Method to process a back card flip animation on this shape.
     */
    processBack(): Promise<void> {
        return this.processAnimation("over", [
            { transform: "translateX(0px)" },
            { transform: "translateX(" + this.bounds.width + "px) rotateY(-180deg)" }
        ]);
    }

    /**
     * Method will process an animation and update the sides to deal with that animation.
     *
     * @param state The current state to switch to for the sides for this animation.
     * @param frames An array of frames to animate for this element.
     */
    private processAnimation(state: string, frames: any[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let sides = this.getProcessingSides();
            if (sides !== null) {
                sides.forEach(x => { x.state = state });
                let upAnimation = this.element["animate"](frames, { duration: this.duration });
                upAnimation.onfinish = () => {
                    sides.forEach(x => { x.state = "none"; });
                    resolve();
                };
            } else {
                resolve();
            }
        });
    }

    /**
     * Helper method is meant to get the current active / next sides for the animation.
     */
    private getProcessingSides(): SideDirective[] {
        let sides = this.sides.toArray();
        let active = sides.find(x => x.isActive);
        if (active) {
            let index = sides.indexOf(active) + 1;
            index = index == sides.length ? 0 : index;

            let next = sides[index];

            return [ active, next ];
        }
        return null;
    }
}
