/**
 * Created by webappaloosa on 4/21/17.
 */
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'search-docs',
    templateUrl: 'search-docs.component.html',
})
export class SearchDocsComponent implements OnInit {

    basicSource: any[] = [
        { title: 'Andorra' },
        { title: 'United Arab Emirates' },
        { title: 'Afghanistan' },
        { title: 'Antigua' },
        { title: 'Anguilla' },
        { title: 'Albania' },
        { title: 'Armenia' },
        { title: 'Netherlands Antilles' },
        { title: 'Angola' },
        { title: 'Argentina' },
        { title: 'American Samoa' },
        { title: 'Austria' },
        { title: 'Australia' },
        { title: 'Aruba' },
        { title: 'Aland Islands' },
        { title: 'Azerbaijan' },
        { title: 'Bosnia' },
        { title: 'Barbados' },
        { title: 'Bangladesh' },
        { title: 'Belgium' },
        { title: 'Burkina Faso' },
        { title: 'Bulgaria' },
        { title: 'Bahrain' },
        { title: 'Burundi' }
    ];
    basicSearch: Function;

    categorySource: any = {
        animals: {
            name: "Animals",
            results: [
                {
                    title: "African Elephant",
                    description: "Vulnerable"
                },
                {
                    title: "African Wild Dog",
                    description: "Endangered"
                },
                {
                    title: "Albacore Tuna",
                    description: "Near Threatened"
                }
            ]
        },
        passwords: {
            name: "Passwords",
            results: [
                {
                    title: "abc123"
                },
                {
                    title: "andrew"
                },
                {
                    title: "asshole"
                }
            ]
        },
        dogs: {
            name: "Dogs",
            results: [
                {
                    title: "Abby",
                    description: "13th most popular Female name"
                },
                {
                    title: "Abby",
                    description: "53th most popular Female name"
                },
                {
                    title: "Alex",
                    description: "25th most popular Female name"
                }
            ]
        },
        cats: {
            name: "Cats",
            results: [
                {
                    title: "Abby",
                    description: "13th most popular Female name"
                },
                {
                    title: "Abby",
                    description: "53th most popular Female name"
                },
                {
                    title: "Alex",
                    description: "25th most popular Female name"
                }
            ]
        }
    };

    constructor() {
    }

    ngOnInit() {
        this.basicSearch = this.searchBasic.bind(this);
    }

    searchBasic(term: string, size: number): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(this.basicSource.filter(x => x.title.toLowerCase().indexOf(term.toLowerCase()) == 0).splice(0, size));
            }, 1000);
        });
    }
}
