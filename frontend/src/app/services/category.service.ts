import { Injectable } from '@angular/core';
import { errorHandl, URL } from "./common";
import { catchError, map } from "rxjs/operators";
import { Category } from "../models/category";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) {
    }

    GetAllCategories(): Promise<Category[]> {
        return this.http.get<Category[]>(URL + '/getAllCategories')
            .pipe(
                map(arr => arr.map(res => {
                    return this.CategoryJSONtoObject(res);
                })),
                catchError(errorHandl)
            ).toPromise();
    }

    GetCategoryById(id: number): Promise<Category> {
        let params = new HttpParams().set('id', id.toString());

        return this.http.get<Category>(URL + '/getCategoryById', {params: params})
            .pipe(
                map(res => {
                    return this.CategoryJSONtoObject(res);
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    AddCategory(category: Category): Promise<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(URL + '/addCategory', category, {observe: 'response'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    UpdateCategory(category: Category): Promise<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(URL + '/updateCategory', category, {observe: 'response'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    CategoryJSONtoObject(res) {
        let category = new Category();
        Object.assign(category, res);

        return category;
    }
}
