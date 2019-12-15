import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { errorHandl, URL } from "./common";
import { catchError, map } from "rxjs/operators";
import { Author } from "../models/author";

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    constructor(private http: HttpClient) {
    }

    GetAllAuthors(): Promise<Author[]> {
        return this.http.get<Author[]>(URL + '/getAllAuthors')
            .pipe(
                map(arr => arr.map(res => {
                    return this.AuthorJSONtoObject(res);
                })),
                catchError(errorHandl)
            ).toPromise();
    }

    GetAuthorById(id: number): Promise<Author> {
        let params = new HttpParams().set('id', id.toString());

        return this.http.get<Author>(URL + '/getAuthorById', {params: params})
            .pipe(
                map(res => {
                    return this.AuthorJSONtoObject(res);
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    AddAuthor(author: Author): Promise<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(URL + '/addAuthor', author, {observe: 'response'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    UpdateAuthor(author: Author): Promise<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(URL + '/updateAuthor', author, {observe: 'response'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    DeleteAuthor(id: number): Promise<HttpResponse<any>> {
        let params = new HttpParams().set('id', id.toString());
        return this.http.delete<HttpResponse<any>>(URL + '/deleteAuthor', {observe: 'response', params: params})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    AuthorJSONtoObject(res) {
        let author = new Author();
        Object.assign(author, res);

        return author;
    }
}
