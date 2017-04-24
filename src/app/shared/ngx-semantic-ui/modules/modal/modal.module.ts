import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { ModalComponent } from "./modal.component";
import { ModalContextDirective } from "./modal-context.directive";
import { ModalApproveDirective } from "./modal-approve.directive";
import { ModalCloseDirective } from "./modal-close.directive";
import { ModalDenyDirective } from "./modal-deny.directive";
import { ModalService } from "./modal.service";
import { ModalConfig } from "./modal.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ModalComponent, ModalContextDirective, ModalApproveDirective, ModalCloseDirective, ModalDenyDirective ],
    exports: [ ModalComponent, ModalContextDirective, ModalApproveDirective, ModalCloseDirective, ModalDenyDirective ],
    providers: [ ModalService ]
})
export class ModalModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: ModalModule, providers: [ ModalConfig ] }; }
}
