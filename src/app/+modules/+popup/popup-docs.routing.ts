import { Routes, RouterModule } from '@angular/router';
import { PopupDocsComponent } from "./popup-docs.component";

export const popupDocsRoutes: Routes = [{
    path: '',
    component: PopupDocsComponent
}];

export const PopupDocsRouting = RouterModule.forChild(popupDocsRoutes);