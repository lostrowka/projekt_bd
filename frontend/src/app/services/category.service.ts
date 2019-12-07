import { Injectable } from '@angular/core';
import { errorHandl, URL } from "./common";
import { catchError, map } from "rxjs/operators";
import { Category } from "../models/category";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  GetAllCategories(): Promise<Category[]> {
    return this.http.get<Category[]>(URL + '/getAllCategories')
        .pipe(
            map(arr => arr.map(res => {
              return this.CategoryJSONtoObject(res);
            })),
            catchError(errorHandl)
        ).toPromise();
  }

  CategoryJSONtoObject(res) {
    let category = new Category();
    Object.assign(category, res);

    return category;
  }
}
