import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditBookComponent } from "./editbook/editbook.component";
import { EditAuthorComponent } from './editauthor/editauthor.component';
import { EditCategoryComponent } from './editcategory/editcategory.component';

@NgModule({
    declarations: [
        EditBookComponent,
        EditAuthorComponent,
        EditCategoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class FormModule {
}
