/**
 * Created by bradleybrandon on 4/21/17.
 */

import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

import {LayoutHeaderComponent} from './layout-header.component';

import {MenuToggleComponent} from './menu-toggle/menu-toggle.component';

@NgModule({
    imports:[
        CommonModule,
    ],
    declarations: [
        LayoutHeaderComponent,
        MenuToggleComponent,
    ],
    exports: [
        LayoutHeaderComponent,
        MenuToggleComponent,
    ]
})

export class LayoutHeaderModule {

}