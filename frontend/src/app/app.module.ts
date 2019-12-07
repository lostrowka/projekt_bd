import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from "@angular/router";
import { CatalogComponent } from "./catalog/catalog.component";
import { HttpClientModule } from "@angular/common/http";
import { EditBookComponent } from './forms/editbook/editbook.component';
import { FormModule } from "./forms/form.module";


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
        path: 'edit',
        children: [{
            path: 'book/:book_id',
            component: EditBookComponent,
            data: {type: 'book'}
        }]
    }
];

@NgModule({
    declarations: [
        AppComponent,
        CatalogComponent
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
