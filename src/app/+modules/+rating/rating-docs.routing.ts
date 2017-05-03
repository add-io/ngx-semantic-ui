/**
 * Created by terry on 4/21/17.
 */
import {Routes, RouterModule} from '@angular/router';
import {RatingDocsComponent} from "./rating-docs.component";

export const ratingDocsRoutes: Routes = [{
    path: '',
    component: RatingDocsComponent
}];

export const RatingDocsRouting = RouterModule.forChild(ratingDocsRoutes);
