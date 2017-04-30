/**
 * Created by terry on 4/21/17.
 */
import {Routes, RouterModule} from '@angular/router';
import {StickyDocsComponent} from "./sticky-docs.component";

export const stickyDocsRoutes: Routes = [{
    path: '',
    component: StickyDocsComponent
}];

export const StickyDocsRouting = RouterModule.forChild(stickyDocsRoutes);
