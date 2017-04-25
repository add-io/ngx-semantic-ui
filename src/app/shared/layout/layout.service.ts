/**
 * Created by webappaloosa on 4/21/17.
 */
import {Component, OnInit, Injectable, Output, EventEmitter} from '@angular/core';

import {config} from '../ngxsui.config';
import {Observable, Subject} from "rxjs/Rx";


import 'rxjs/add/operator/debounceTime';



const store = {
    isMobile: (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())),
    device: '',
    mobileViewActivated: false,
    menuCollapsed: false
};


@Injectable()
export class LayoutService {

    @Output() fire: EventEmitter<any> = new EventEmitter();


    store: any;

    private subject: Subject<any>;


    trigger() {
        this.subject.next(this.store)
    }

    subscribe(next, err?, complete?) {
        return this.subject.subscribe(next, err, complete)
    }

    constructor() {
        this.subject = new Subject();
        this.store = store;
        this.trigger();

        Observable.fromEvent(window, 'resize').debounceTime(100).map(() => {
            this.trigger()
        }).subscribe()
    }


    toggleNavMenu(){
        this.store.menuCollapsed = !this.store.menuCollapsed;
        this.trigger();

    }

}