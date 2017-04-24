import { Renderer2 } from "@angular/core";

export class TransitionService {

    constructor(private _renderer: Renderer2) {
    }

    public animate(ele: any, animation: string, duration: number = 400, direction: "in"|"out" = "in") {
        let animations = animation.split(" ");
        for(let i = 0; i < animations.length; ++i) {
            this._renderer.addClass(ele, animations[i]);
        }
        this._renderer.addClass(ele, "transition");
        this._renderer.addClass(ele, direction);
        this._renderer.setStyle(ele, "animation-duration", duration + "ms");
    }
}
