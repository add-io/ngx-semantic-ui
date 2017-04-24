/**
 * Created by bradleybrandon on 4/21/17.
 */
import {Routes, RouterModule} from '@angular/router';
import {CheckboxDocsComponent} from "./checkbox-docs.component";

export const checkboxDocsRoutes: Routes = [{
    path: '',
    component: CheckboxDocsComponent
}];

export const CheckboxDocsRouting = RouterModule.forChild(checkboxDocsRoutes);

