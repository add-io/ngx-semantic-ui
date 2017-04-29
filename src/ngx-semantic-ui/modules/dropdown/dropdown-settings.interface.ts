export interface IDropdownSettings {
    /**
     * Configuration that allows for the selection to be reselected.
     */
    allowReselection: boolean;
    /**
     * The action that should be taken when an item is selected.
     */
    action: string;
    /**
     * The minimum amount of characters needed before search filter is done.
     */
    minCharacters: number;
    /**
     * Which element on the items should be searched on, can either be value or text.
     */
    match: string;
    /**
     * Max selections that can be selected in a multi select dropdown.
     */
    maxSelections: number|boolean;
    /**
     * The transition that should be used for the inserting of lables in a multi select dropdown.
     */
    labelTransition: string;
    /**
     * The label duration that should be used for in multi select dropdowns.
     */
    labelDuration: number;
    /**
     * The transition the menu should take when opening or closing.
     */
    transition: string;
    /**
     * The duration of the transition that should be used for the opening and closing of the transition.
     */
    duration: number;
}
