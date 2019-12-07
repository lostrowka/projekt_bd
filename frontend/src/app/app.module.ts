import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from "@angular/router";
import { CatalogComponent } from "./catalog/catalog.component";
import { HttpClientModule } from "@angular/common/http";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full'
    },
    {
        path: 'catalog',
        component: CatalogComponent
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
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
