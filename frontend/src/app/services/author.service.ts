import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { errorHandl, URL } from "./common";
import { catchError, map } from "rxjs/operators";
import { Author } from "../models/author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  GetAllAuthors(): Promise<Author[]> {
    return this.http.get<Author[]>(URL + '/getAllAuthors')
        .pipe(
            map(arr => arr.map(res => {
              return this.AuthorJSONtoObject(res);
            })),
            catchError(errorHandl)
        ).toPromise();
  }

  AuthorJSONtoObject(res) {
    let author = new Author();
    Object.assign(author, res);

    return author;
  }
}
