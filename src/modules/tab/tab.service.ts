import { Injectable } from "@angular/core";

import { TabDirective } from "./tab.directive";
import { TabTriggerDirective } from "./tab-trigger.directive";

@Injectable()
export class TabService {

    /**
     * List of all the tabs in the app at the moment.
     */
    private tabs: TabDirective[];
    /**
     * List of all the triggers in the app at the moment.
     */
    private triggers: TabTriggerDirective[];

    /**
     * Constructor is meant to initilize the triggers and tabs.
     */
    constructor() {
        this.triggers = [];
        this.tabs = [];
    }

    /**
     * Method is meant to add the trigger to the triggers in this app.
     *
     * @param trigger The trigger to push into the triggers for this app.
     */
    addTrigger(trigger: TabTriggerDirective) {
        if (this.triggers.indexOf(trigger) === -1) {
            this.triggers.push(trigger);
        }
    }

    /**
     * Method is meant to add the tab to the tabs in this app.
     *
     * @param tab The tab to push into the tabs for this app.
     */
    addTab(tab: TabDirective) {
        if (this.tabs.indexOf(tab) === -1) {
            this.tabs.push(tab);
        }
    }

    /**
     * Method will remove the trigger from the service if it exists.
     *
     * @param trigger The trigger that needs to be removed from this service.
     */
    removeTrigger(trigger: TabTriggerDirective) {
        if (this.triggers.indexOf(trigger) > -1) {
            this.triggers.splice(this.triggers.indexOf(trigger), 1);
        }
    }

    /**
     * Method will remove the tab from the service if it exists.
     *
     * @param tab The tab that needs to be removed from this service.
     */
    removeTab(tab: TabDirective) {
        if (this.tabs.indexOf(tab) > -1) {
            this.tabs.splice(this.tabs.indexOf(tab), 1);
        }
    }

    /**
     * Method will show the tab on the page and hide all other tabs in the context.
     *
     * @param path The path to show.
     * @param context The context this service needs to stay in when showing the path.
     */
    showTab(path: string, context: string) {
        this.hideTabs(context);
        this.hideTriggers(context);

        let paths = this.breakIntoPaths(path);
        let pathRegx = new RegExp("^" + path);
        let childrenPaths: string[] = [];
        let childrenLengths: number[] = [];

        for(let i = 0; i < this.tabs.length; ++i) {
            if (this.tabs[i].context === context) {
                if (paths.indexOf(this.tabs[i].path) > -1) {
                    this.tabs[i].showTab();
                } else if (pathRegx.test(this.tabs[i].path) && this.tabs[i].isDefault) {
                    let length = this.tabs[i].path.split("/").length;

                    if (childrenLengths.indexOf(length) === -1) {
                        childrenLengths.push(length);
                        childrenPaths.push(this.tabs[i].path);

                        this.tabs[i].showTab();
                    }
                }
            }
        }

        for(let i = 0; i < this.triggers.length; ++i) {
            if (this.triggers[i].context === context) {
                if (paths.indexOf(this.triggers[i].path) > -1) {
                    this.triggers[i].showTrigger();
                } else if(childrenPaths.indexOf(this.triggers[i].path) > -1) {
                    this.triggers[i].showTrigger();
                }
            }
        }
    }

    /**
     * Will break the string into an array of paths based on the tree.
     *
     * @param path The path that needs to be broken up into parts.
     * @example "first/one/nest" => ["first", "first/one", "first/one/nest"]
     */
    private breakIntoPaths(path: string) {
        let arrayPath = path.split("/");
        let currentPath = [];
        let paths = [];
        while(arrayPath.length > 0) {
            currentPath.push(arrayPath.shift());
            paths.push(currentPath.join("/"));
        }
        return path;
    }

    /**
     * Helper method that will hide all tabs in a context.
     *
     * @param context The context to hide all the tabs in.
     */
    private hideTabs(context: string) {
        for(let i = 0; i < this.tabs.length; ++i) {
            if (this.tabs[i].context === context) {
                this.tabs[i].hideTab();
            }
        }
    }

    /**
     * Helper method that will hide all the triggers in a context.
     *
     * @param context The context to hide all the triggers in.
     */
    private hideTriggers(context: string) {
        for(let i = 0; i < this.triggers.length; ++i) {
            if (this.triggers[i].context === context) {
                this.triggers[i].hideTrigger();
            }
        }
    }
}
