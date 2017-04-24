/**
 * Created by terry on 4/21/17.
 */
import {Routes, RouterModule} from '@angular/router';
import {TabDocsComponent} from "./tab-docs.component";

export const tabDocsRoutes: Routes = [{
    path: '',
    component: TabDocsComponent
}];

export const TabDocsRouting = RouterModule.forChild(tabDocsRoutes);

