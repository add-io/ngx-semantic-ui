/**
 * Created by webappaloosa on 4/21/17.
 */
import {RouterModule, Routes} from "@angular/router";


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'accordion',
        pathMatch: 'full',
    },
    {
        path: 'accordion',
        loadChildren: 'app/+modules/+accordion/accordion-docs.module#AccordionDocsModule',
        data: {pageTitle: 'Accordion'}
    },
    {
        path: 'checkbox',
        loadChildren: 'app/+modules/+checkbox/checkbox-docs.module#CheckboxDocsModule',
        data: {pageTitle: 'Checkbox'}
    },
    {
        path: 'tab',
        loadChildren: 'app/+modules/+tab/tab-docs.module#TabDocsModule',
        data: {pageTitle: 'Tab'}
    },
    {
        path: 'dropdown',
        loadChildren: 'app/+modules/+dropdown/dropdown-docs.module#DropDownDocsModule',
        data: {pageTitle: 'DropDown'}
    },
    {
        path: 'modal',
        loadChildren: 'app/+modules/+modal/modal-docs.module#ModalDocsModule',
        data: {pageTitle: 'Modal'}
    },
    {
        path: 'sticky',
        loadChildren: 'app/+modules/+sticky/sticky-docs.module#StickyDocsModule',
        data: {pageTitle: 'Sticky'}
    },
    {
        path: 'rating',
        loadChildren: 'app/+modules/+rating/rating-docs.module#RatingDocsModule',
        data: {pageTitle: 'Rating'}
    },
    {
        path: 'progress',
        loadChildren: 'app/+modules/+progress/progress-docs.module#ProgressDocsModule',
        data: {pageTitle: 'Progress'}
    },
    {
        path: 'search',
        loadChildren: 'app/+modules/+search/search-docs.module#SearchDocsModule',
        data: {pageTitle: 'Search'}
    },
    {
        path: 'shape',
        loadChildren: 'app/+modules/+shape/shape-docs.module#ShapeDocsModule',
        data: {pageTitle: 'Shape'}
    }
    // {
    //     path: 'popup',
    //     loadChildren: 'app/+modules/+popup/popup-docs.module#PopupDocsModule',
    //     data: { pageTitle: 'Popup' }
    // }
];

export const ModulesDocsRouting = RouterModule.forChild(routes);
