/**
 * Created by webappaloosa on 4/21/17.
 */
import {RouterModule, Routes} from "@angular/router";
import {ShapeDocsComponent} from "./shape-docs.component";

export const routes: Routes = [
    {
        path: '',
        component: ShapeDocsComponent
    },
];

export const ShapeDocsRouting = RouterModule.forChild(routes);
