import { Component, OnInit } from '@angular/core';
import { CatalogService } from "../services/catalog.service";
import { Book } from "../models/book";

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styles: []
})
export class CatalogComponent implements OnInit {

    books: Book[];

    constructor(private catalogService: CatalogService) {
    }

    ngOnInit() {
        this.catalogService.GetAllBooks().then((res) => {
            console.log("Success");
            this.books = res;
        })
    }

}
