import {Routes, RouterModule} from '@angular/router';
import {DropDownDocsComponent} from "./dropdown-docs.component";

export const dropdownDocsRoutes: Routes = [{
    path: '',
    component: DropDownDocsComponent
}];

export const DropDownDocsRouting = RouterModule.forChild(dropdownDocsRoutes);