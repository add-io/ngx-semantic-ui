/**
 * Created by bradleybrandon on 4/21/17.
 */
import {Routes, RouterModule} from '@angular/router';
import {AccordionDocsComponent} from "./accordion-docs.component";

export const accordionDocsRoutes: Routes = [{
    path: '',
    component: AccordionDocsComponent
}];

export const AccordionDocsRouting = RouterModule.forChild(accordionDocsRoutes);

