/**
 * Created by bradleybrandon on 4/21/17.
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
        path: 'sidebar',
        loadChildren: 'app/+modules/+sidebar/sidebar-docs.module#SidebarDocsModule',
        data: {pageTitle: 'Sidebar'}
    }
    // {
    //     path: 'popup',
    //     loadChildren: 'app/+modules/+popup/popup-docs.module#PopupDocsModule',
    //     data: { pageTitle: 'Popup' }
    // }
];

export const ModulesDocsRouting = RouterModule.forChild(routes);
