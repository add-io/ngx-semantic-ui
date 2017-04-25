/**
 * Created by webappaloosa on 4/21/17.
 */
import {RouterModule, Routes} from "@angular/router";
import {SidebarDocsComponent} from "./sidebar-docs.component";

export const routes: Routes = [
    {
        path: '',
        component: SidebarDocsComponent
    },
];

export const SidebarDocsRouting = RouterModule.forChild(routes);