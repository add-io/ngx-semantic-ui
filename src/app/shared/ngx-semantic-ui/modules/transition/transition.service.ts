import { Renderer2 } from "@angular/core";

export class TransitionService {

    constructor(private _renderer: Renderer2) {
    }

    public animate(ele: any, animation: string, duration: number = 400, direction: "in"|"out" = "in") {
        this._renderer.addClass(ele, animation);
        this._renderer.addClass(ele, "transition");
        this._renderer.addClass(ele, direction);
        this._renderer.setStyle(ele, "animation-duration", duration + "ms");
    }
}
