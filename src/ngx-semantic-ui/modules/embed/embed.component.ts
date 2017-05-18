import { Component, Input, OnInit, HostListener, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: ".ui.embed",
    template:
`<i class="video play icon"></i>
<img class="placeholder" [src]="placeholder" />
<div class="embed" *ngIf="loadEmbed">
    <iframe [src]="getUrl()" width="100%" height="100%" frameborder="0" scrolling="no" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>`
})
export class EmbedComponent implements OnInit {

    loadEmbed: boolean = false;

    @Input("source") source: string = "youtube";
    @Input("id") id: string;
    @Input("placeholder") placeholder: string;

    constructor(private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        if (this.id == null) {
            console.log("id not found");
        }
    }

    @HostListener("click", [ "$event" ])
    click(event: MouseEvent) {
        this.loadEmbed = true;
    }

    getUrl() {
        // TODO: Get this working without the security bypass.
        return this._sanitizer.bypassSecurityTrustResourceUrl("//www.youtube.com/embed/" + this.id);
    }
}
