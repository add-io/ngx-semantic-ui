/**
 * Created by webappaloosa on 4/21/17.
 */
import {NgModule} from "@angular/core";
import {IntroductionRouting} from "./introduction.routing";
import {IntroductionComponent} from "./introduction.component";


@NgModule({
    declarations: [
        IntroductionComponent
    ],
    imports: [
        IntroductionRouting
    ],
    providers: [],
})
export class IntroductionModule {

}
