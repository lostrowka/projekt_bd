import { Component, OnInit } from '@angular/core';
import { CatalogService } from "../services/catalog.service";
import { CatalogEntry } from "../models/catalog_entry";

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styles: []
})
export class CatalogComponent implements OnInit {

    books: CatalogEntry[];

    constructor(private catalogService: CatalogService) {
    }

    ngOnInit() {
        this.catalogService.GetCatalogData().then((res) => {
            console.log("Success");
            this.books = res;
        })
    }

    deleteEntry(id: number) {
        console.log(id)
    }

}
