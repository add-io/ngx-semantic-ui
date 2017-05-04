/**
 * Created by terry on 4/21/17.
 */
import { Routes, RouterModule } from '@angular/router';
import { ProgressDocsComponent } from "./progress-docs.component";

export const progressDocsRoutes: Routes = [{
    path: '',
    component: ProgressDocsComponent
}];

export const ProgressDocsRouting = RouterModule.forChild(progressDocsRoutes);
