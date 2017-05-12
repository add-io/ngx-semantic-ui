import {Routes, RouterModule} from '@angular/router';
import {DimmerDocsComponent} from "./dimmer-docs.component";

export const dimmerDocsRoutes: Routes = [{
    path: '',
    component: DimmerDocsComponent
}];

export const DimmerDocsRouting = RouterModule.forChild(dimmerDocsRoutes);
