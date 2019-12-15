import { Component, OnInit } from '@angular/core';
import { CatalogService } from "../services/catalog.service";
import { CatalogEntry } from "../models/catalog_entry";
import { BookService } from "../services/book.service";

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styles: []
})
export class CatalogComponent implements OnInit {

    entries: CatalogEntry[];

    constructor(private catalogService: CatalogService, private bookService: BookService) {
    }

    ngOnInit() {
        this.catalogService.GetCatalogData().then((res) => {
            console.log("Success");
            this.entries = res;
        })
    }

    deleteEntry(id: number) {
        this.bookService.DeleteBook(id).then((res) => {
            if(res.status == 200) {
                if (confirm("Pomyślnie usunięto")) {
                    this.entries = this.entries.filter(x => x.id != id);
                }
            }
        })
    }

}
