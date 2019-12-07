import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { CatalogEntry } from "../models/catalog_entry";
import { URL, errorHandl } from "./common";

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    constructor(private http: HttpClient) {
    }

    GetCatalogData(): Promise<CatalogEntry[]> {
        return this.http.get<CatalogEntry[]>(URL + '/getCatalogData')
            .pipe(
                map(arr => arr.map(res => {
                    return this.CatalogEntryJSONtoObject(res);
                })),
                catchError(errorHandl)
            ).toPromise();
    }

    CatalogEntryJSONtoObject(res) {
        let entry = new CatalogEntry();
        Object.assign(entry, res);

        return entry;
    }
}
