import { Injectable } from '@angular/core';
import { Book } from "../models/book";
import { errorHandl, URL } from "./common";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient) {
    }

    GetAllBooks(): Promise<Book[]> {
        return this.http.get<Book[]>(URL + '/getAllBooks')
            .pipe(
                map(arr => arr.map(res => {
                    return this.BookJSONtoObject(res);
                })),
                catchError(errorHandl)
            ).toPromise();
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

    UpdateBook(book: Book): Promise<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(URL + '/updateBook', book, {observe: 'response'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    AddBook(book: Book): Promise<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(URL + '/addBook', book, {observe: 'response'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    DeleteBook(id: number): Promise<HttpResponse<any>> {
        let params = new HttpParams().set('id', id.toString());
        return this.http.delete<HttpResponse<any>>(URL + '/deleteBook', {observe: 'response', params: params})
            .pipe(
                map(res => {
                    return res;
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
