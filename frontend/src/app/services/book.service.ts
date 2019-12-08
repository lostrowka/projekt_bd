import { Injectable } from '@angular/core';
import { Book } from "../models/book";
import { errorHandl, URL } from "./common";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient) {
    }

    GetBookById(id: number): Promise<Book> {
        let params = new HttpParams().set('id', id.toString());

        return this.http.get<Book>(URL + '/getBookById', {params: params})
            .pipe(
                map(res => {
                    return this.BookJSONtoObject(res);
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    UpdateBook(book: Book): Promise<number> {
        return this.http.post<Book>(URL + '/updateBook', book, {observe: 'response'})
            .pipe(
                map(res => {
                    return res.status;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    AddBook(book: Book): Promise<number> {
        return this.http.post<Book>(URL + '/addBook', book, {observe: 'response'})
            .pipe(
                map(res => {
                    return res.status;
                }),
                catchError(errorHandl)
            ).toPromise();
    }


    BookJSONtoObject(res) {
        let book = new Book();
        Object.assign(book, res);

        return book;
    }
}