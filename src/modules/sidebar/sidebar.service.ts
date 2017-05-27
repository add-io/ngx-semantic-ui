/**
 * Created by bradleybrandon on 4/22/17.
 */
import { Injectable } from "@angular/core";

import { SidebarDirective } from "./sidebar.directive";
import { SidebarTriggerDirective } from "./sidebar-trigger.directive";

@Injectable()
export class SidebarService {

    /**
     * List of all the sidebars in the app at the moment.
     */
    private sidebars: SidebarDirective[];
    /**
     * List of all the triggers in the app at the moment.
     */
    private triggers: SidebarTriggerDirective[];

    /**
     * Constructor is meant to initilize the triggers and sidebars.
     */
    constructor() {
        this.triggers = [];
        this.sidebars = [];
    }

    /**
     * Method is meant to add the trigger to the triggers in this app.
     *
     * @param trigger The trigger to push into the triggers for this app.
     */
    addTrigger(trigger: SidebarTriggerDirective) {
        if (this.triggers.indexOf(trigger) === -1) {
            this.triggers.push(trigger);
        }
    }

    /**
     * Method is meant to add the sidebar to the sidebars in this app.
     *
     * @param sidebar The sidebar to push into the sidebars for this app.
     */
    addSidebar(sidebar: SidebarDirective) {
        if (this.sidebars.indexOf(sidebar) === -1) {
            this.sidebars.push(sidebar);
        }
    }

    /**
     * Method will remove the trigger from the service if it exists.
     *
     * @param trigger The trigger that needs to be removed from this service.
     */
    removeTrigger(trigger: SidebarTriggerDirective) {
        if (this.triggers.indexOf(trigger) > -1) {
            this.triggers.splice(this.triggers.indexOf(trigger), 1);
        }
    }

    /**
     * Method will remove the sidebar from the service if it exists.
     *
     * @param sidebar The sidebar that needs to be removed from this service.
     */
    removeSidebar(sidebar: SidebarDirective) {
        if (this.sidebars.indexOf(sidebar) > -1) {
            this.sidebars.splice(this.sidebars.indexOf(sidebar), 1);
        }
    }

    /**
     * Method will show the sidebar on the page and hide all other sidebars in the context.
     *
     * @param path The path to show.
     * @param context The context this service needs to stay in when showing the path.
     */
    showSidebar(path: string, context: string) {
        this.hideSidebars(context);
        this.hideTriggers(context);

        let paths = this.breakIntoPaths(path);
        let pathRegx = new RegExp("^" + path);
        let childrenPaths: string[] = [];
        let childrenLengths: number[] = [];

        for(let i = 0; i < this.sidebars.length; ++i) {
            if (this.sidebars[i].context === context) {
                if (paths.indexOf(this.sidebars[i].path) > -1) {
                    this.sidebars[i].showSidebar();
                } else if (pathRegx.test(this.sidebars[i].path) && this.sidebars[i].isDefault) {
                    let length = this.sidebars[i].path.split("/").length;

                    if (childrenLengths.indexOf(length) === -1) {
                        childrenLengths.push(length);
                        childrenPaths.push(this.sidebars[i].path);

                        this.sidebars[i].showSidebar();
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
     * Helper method that will hide all sidebars in a context.
     *
     * @param context The context to hide all the sidebars in.
     */
    private hideSidebars(context: string) {
        for(let i = 0; i < this.sidebars.length; ++i) {
            if (this.sidebars[i].context === context) {
                this.sidebars[i].hideSidebar();
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
