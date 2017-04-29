import {NgModule} from '@angular/core';

import {NgxSemanticUiModule} from './shared/ngx-semantic-ui.module';
import {AppComponent} from './app.component';

import {routing} from './app.routing';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [

        BrowserModule,
        routing,
        NgxSemanticUiModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
