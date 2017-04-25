/**
 * Created by webappaloosa on 4/21/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        data: { pageTitle: 'Home' },
        children: [
            {
                path: '', redirectTo: 'introduction', pathMatch: 'full'
            },
            {
                path: 'introduction',
                loadChildren: 'app/+introduction/introduction.module#IntroductionModule',
                data: { pageTitle: 'Introduction' }
            },
            {
                path: 'modules',
                loadChildren: 'app/+modules/modules-docs.module#ModulesDocsModule',
                data: {pageTitle: 'Modules'}
            },

        ]
    }
//
];

export const routing = RouterModule.forRoot(routes);
