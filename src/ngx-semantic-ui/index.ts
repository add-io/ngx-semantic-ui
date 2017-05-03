export {
    // #region Tab Includes
    TabDirective, TabTriggerDirective, TabContextDirective, TabService,
    // #endregion

    // #region Dropdown Includes
    DropdownSelectDirective, DropdownDirective, DropdownService, InputDirective, SearchInputDirective, IDropdownSettings,
    DropdownSelectComponent, MultiSelectLabelComponent, SearchInputComponent, IconDirective, InputHiddenDirective, DropdownConfig,
    ItemDirective, MenuDirective, OptionDirective, TextDirective, DropdownSelectValueAccessor, DropdownSelectMultipleValueAccessor,
    DropdownMenuProcessor, IDropdownProcessor, DropdownSelectionProcessor,
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
    StickyContextDirective, StickyDirective, StickyConfig,
    // #endregion

    // #region Rating Includes
    RatingComponent, RatingValueAccessor,
    // #endregion

    // #region Transition Includes
    TransitionService
    // #endregion
} from "./modules";

import { NgModule, ModuleWithProviders } from "@angular/core";
import { AccordionModule, CheckboxModule, ModalModule, TabModule, DropdownModule, StickyModule } from "./modules";

export function Modules() {
    return [
        AccordionModule,
        CheckboxModule,
        ModalModule,
        TabModule,
        DropdownModule,
        StickyModule
    ];
};

@NgModule({
    imports: [
        AccordionModule.forRoot(),
        CheckboxModule.forRoot(),
        ModalModule.forRoot(),
        TabModule.forRoot(),
        DropdownModule.forRoot(),
        StickyModule.forRoot()
    ],
    exports: Modules()
})
export class NgxRootModule { }

@NgModule({ exports: Modules() })
export class NgxSemanticUiModule {
    static forRoot(): ModuleWithProviders { return { ngModule: NgxRootModule }; }
}
