import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from "@angular/router";
import { CatalogComponent } from "./catalog/catalog.component";
import { HttpClientModule } from "@angular/common/http";
import { EditBookComponent } from './forms/editbook/editbook.component';
import { FormModule } from "./forms/form.module";
import { EditAuthorComponent } from "./forms/editauthor/editauthor.component";
import { EditCategoryComponent } from "./forms/editcategory/editcategory.component";
import { RentalsComponent } from './rentals/rentals.component';
import { EditUserComponent } from "./forms/edituser/edituser.component";
import { EditRentalComponent } from "./forms/editrental/editrental.component";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full'
    },
    {
        path: 'catalog',
        component: CatalogComponent
    },
    {
        path: 'rentals',
        component: RentalsComponent
    },
    {
        path: 'edit',
        children: [{
            path: 'book/:book_id',
            component: EditBookComponent
        }, {
            path: 'rental/:rental_id',
            component: EditRentalComponent
        }, {
            path: 'author',
            component: EditAuthorComponent,
            data: {mode: 'edit'}
        }, {
            path: 'user',
            component: EditUserComponent,
            data: {mode: 'edit'}
        }, {
            path: 'category',
            component: EditCategoryComponent,
            data: {mode: 'edit'}
        }]
    },
    {
        path: 'add',
        children: [{
            path: 'book',
            component: EditBookComponent
        }, {
            path: 'rental',
            component: EditRentalComponent
        }, {
            path: 'author',
            component: EditAuthorComponent,
            data: {mode: 'add'}
        }, {
            path: 'user',
            component: EditUserComponent,
            data: {mode: 'add'}
        }, {
            path: 'category',
            component: EditCategoryComponent,
            data: {mode: 'add'}
        }]
    }
];

@NgModule({
    declarations: [
        AppComponent,
        CatalogComponent,
        RentalsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        FormModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
