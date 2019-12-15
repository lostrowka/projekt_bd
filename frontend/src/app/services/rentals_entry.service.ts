import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { errorHandl, URL } from "./common";
import { catchError, map } from "rxjs/operators";
import { RentalsEntry } from "../models/rentals_entry";

@Injectable({
    providedIn: 'root'
})
export class RentalsEntryService {

    constructor(private http: HttpClient) {
    }

    GetAllRentals(): Promise<RentalsEntry[]> {
        return this.http.get<RentalsEntry[]>(URL + '/getAllRentalEntries')
            .pipe(
                map(arr => arr.map(res => {
                    return this.RentalsEntryJSONtoObject(res);
                })),
                catchError(errorHandl)
            ).toPromise();
    }

    RentalsEntryJSONtoObject(res) {
        let rental = new RentalsEntry();
        Object.assign(rental, res);

        return rental;
    }
}
