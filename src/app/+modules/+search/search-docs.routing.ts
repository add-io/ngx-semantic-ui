/**
 * Created by webappaloosa on 4/21/17.
 */
import {RouterModule, Routes} from "@angular/router";
import {SearchDocsComponent} from "./search-docs.component";

export const routes: Routes = [
    {
        path: '',
        component: SearchDocsComponent
    },
];

export const SearchDocsRouting = RouterModule.forChild(routes);
