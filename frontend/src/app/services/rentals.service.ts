import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { errorHandl, URL } from "./common";
import { catchError, map } from "rxjs/operators";
import { Rental } from "../models/rental";
import { Author } from "../models/author";

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

    GetRentalById(id: number): Promise<Rental> {
        let params = new HttpParams().set('id', id.toString());

        return this.http.get<Rental>(URL + '/getRentalById', {params: params})
            .pipe(
                map(res => {
                    return this.RentalJSONtoObject(res);
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    AddRental(rental: Rental): Promise<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(URL + '/addRental', rental, {observe: 'response'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    UpdateRental(rental: Rental): Promise<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(URL + '/updateRental', rental, {observe: 'response'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    DeleteRental(id: number): Promise<HttpResponse<any>> {
        let params = new HttpParams().set('id', id.toString());
        return this.http.delete<HttpResponse<any>>(URL + '/deleteRental', {observe: 'response', params: params})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    RentalJSONtoObject(res) {
        let rental = new Rental();
        Object.assign(rental, res);

        rental.date_on = new Date(res.date_on);
        rental.date_to = new Date(res.date_to);

        return rental;
    }
}
