import { Renderer2 } from "@angular/core";

export class TransitionService {

    constructor(private _renderer: Renderer2) {
    }

    public animate(ele: any, animation: string, duration: number = 400, direction: "in"|"out" = "in"): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let animations = animation.split(" ");
            animations.push(direction);

            let listener = this.bindAnimationEnd(ele, (event) => {
                for(let i = 0; i < animations.length; ++i) {
                    this._renderer.removeClass(ele, animations[i]);
                }

                listener();
                resolve();
            });

            this._renderer.addClass(ele, "transition");
            for(let i = 0; i < animations.length; ++i) {
                this._renderer.addClass(ele, animations[i]);
            }
            this._renderer.setStyle(ele, "animation-duration", duration + "ms");
        });
    }

    private bindAnimationEnd(ele: any, callback: (event: any) => boolean | void) {
        let element = this._renderer.createElement("div");
        let animations  = {
            'animation'       :'animationend',
            'OAnimation'      :'oAnimationEnd',
            'MozAnimation'    :'mozAnimationEnd',
            'WebkitAnimation' :'webkitAnimationEnd'
        };

        for(let animation in animations) {
            if (element.style[animation] !== undefined) {
                return this._renderer.listen(ele, animations[animation], callback);
            }
        }
        return null;
    }
}
