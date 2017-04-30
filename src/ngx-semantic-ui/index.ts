export {
    // #region Tab Includes
    TabDirective, TabTriggerDirective, TabContextDirective, TabService,
    // #endregion

    // #region Dropdown Includes
    DropdownSelectDirective, DropdownDirective, DropdownService, InputDirective, SearchInputDirective, IDropdownSettings,
    DropdownSelectComponent, MultiSelectLabelComponent, SearchInputComponent, IconDirective, InputHiddenDirective, DropdownConfig,
    ItemDirective, MenuDirective, OptionDirective, TextDirective, DropdownSelectValueAccessor, DropdownSelectMultipleValueAccessor,
    // #endregion

    // #region Checkbox Includes
    CheckboxDirective, RadioCheckboxDirective,
    // #endregion

    // #region Accordion Includes
    AccordionContentComponent, AccordionDirective, AccordionTitleDirective,
    // #endregion

    // #region Popup Includes
    PopupDirective, PopupTriggerDirective, PopupService, TooltipDirective,
    // #endregion

    // #region Modal Includes
    ModalComponent, ModalContextDirective, ModalApproveDirective, ModalDenyDirective, ModalCloseDirective, ModalService,
    // #endregion

    // #region Sticky Includes
    StickyContextDirective, StickyDirective,
    // #endregion

    // #region Transition Includes
    TransitionService
    // #endregion
} from "./modules";

import { NgModule, ModuleWithProviders } from "@angular/core";
import { AccordionModule, CheckboxModule, ModalModule, TabModule, DropdownModule } from "./modules";

const MODULES = [
    AccordionModule,
    CheckboxModule,
    ModalModule,
    TabModule,
    DropdownModule
];

@NgModule({
    imports: [
        AccordionModule.forRoot(),
        CheckboxModule.forRoot(),
        ModalModule.forRoot(),
        TabModule.forRoot(),
        DropdownModule.forRoot()
    ],
    exports: MODULES
})
export class NgxRootModule { }

@NgModule({ exports: MODULES })
export class NgxSemanticUiModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: NgxRootModule }; }
}
