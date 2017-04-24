/**
 * Created by bradleybrandon on 4/21/17.
 */

import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

import {LayoutFooterComponent} from './layout-footer.component';

@NgModule({
    imports:[
        CommonModule,
    ],
    declarations: [
        LayoutFooterComponent,
    ],
    exports: [
        LayoutFooterComponent,
    ]
})

export class LayoutFooterModule {

}