/**
 * Created by terry on 4/21/17.
 */
import {Routes, RouterModule} from '@angular/router';
import {EmbedDocsComponent} from "./embed-docs.component";

export const embedDocsRoutes: Routes = [{
    path: '',
    component: EmbedDocsComponent
}];

export const EmbedDocsRouting = RouterModule.forChild(embedDocsRoutes);
