import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { errorHandl, URL } from "./common";
import { catchError, map } from "rxjs/operators";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    GetAllUsers(): Promise<User[]> {
        return this.http.get<User[]>(URL + '/getAllUsers')
            .pipe(
                map(arr => arr.map(res => {
                    return this.UsersJSONtoObject(res);
                })),
                catchError(errorHandl)
            ).toPromise();
    }

    GetUserById(id: number): Promise<User> {
        let params = new HttpParams().set('id', id.toString());

        return this.http.get<User>(URL + '/getUserById', {params: params})
            .pipe(
                map(res => {
                    return this.UsersJSONtoObject(res);
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    AddUser(user: User): Promise<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(URL + '/addUser', user, {observe: 'response'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    UpdateUser(user: User): Promise<HttpResponse<any>> {
        return this.http.post<HttpResponse<any>>(URL + '/updateUser', user, {observe: 'response'})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    DeleteUser(id: number): Promise<HttpResponse<any>> {
        let params = new HttpParams().set('id', id.toString());
        return this.http.delete<HttpResponse<any>>(URL + '/deleteUser', {observe: 'response', params: params})
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(errorHandl)
            ).toPromise();
    }

    UsersJSONtoObject(res) {
        let user = new User();
        Object.assign(user, res);

        return user;
    }
}
