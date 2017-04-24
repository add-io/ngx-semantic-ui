/**
 * Created by bradleybrandon on 4/21/17.
 */
import {RouterModule, Routes} from "@angular/router";
import {IntroductionComponent} from "./introduction.component";

export const routes: Routes = [
    {
        path: '',
        component: IntroductionComponent
    },
];

export const IntroductionRouting = RouterModule.forChild(routes);
