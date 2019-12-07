import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Book } from "../models/book";
import { URL } from "../app.component"
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    constructor(private http: HttpClient) {
    }

    GetAllBooks(): Promise<Book[]> {
        return this.http.get<Book[]>(URL + '/getAllBooks')
            .pipe(
                map(arr => arr.map(res => {
                    return this.BookJSONtoObject(res);
                })),
                catchError(this.errorHandl)
            ).toPromise();
    }

    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    BookJSONtoObject(res) {
        let book = new Book();
        Object.assign(book, res);

        return book;
    }
}
