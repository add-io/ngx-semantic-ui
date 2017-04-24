import {NgModule} from '@angular/core';

import {NgxSemanticUiModule} from './shared/ngx-semantic-ui.module';
import {AppComponent} from './app.component';

import {routing} from './app.routing';
import {BrowserModule} from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [

        BrowserModule,
        BrowserAnimationsModule,
        routing,
        NgxSemanticUiModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
