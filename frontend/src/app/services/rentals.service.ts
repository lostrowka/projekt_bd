import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { errorHandl, URL } from "./common";
import { catchError, map } from "rxjs/operators";
import { Rental } from "../models/rental";

@Injectable({
    providedIn: 'root'
})
export class RentalsService {

    constructor(private http: HttpClient) {
    }

    GetAllRentals(): Promise<Rental[]> {
        return this.http.get<Rental[]>(URL + '/getAllCategories')
            .pipe(
                map(arr => arr.map(res => {
                    return this.RentalJSONtoObject(res);
                })),
                catchError(errorHandl)
            ).toPromise();
    }

    RentalJSONtoObject(res) {
        let rental = new Rental();
        Object.assign(rental, res);

        return rental;
    }
}
