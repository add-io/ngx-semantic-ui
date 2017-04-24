import {Routes, RouterModule} from '@angular/router';
import {ModalDocsComponent} from "./modal-docs.component";

export const modalDocsRoutes: Routes = [{
    path: '',
    component: ModalDocsComponent
}];

export const ModalDocsRouting = RouterModule.forChild(modalDocsRoutes);