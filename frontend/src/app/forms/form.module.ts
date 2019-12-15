import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditBookComponent } from "./editbook/editbook.component";
import { EditAuthorComponent } from './editauthor/editauthor.component';
import { EditCategoryComponent } from './editcategory/editcategory.component';
import { EditUserComponent } from './edituser/edituser.component';
import { EditRentalComponent } from './editrental/editrental.component';

@NgModule({
    declarations: [
        EditBookComponent,
        EditAuthorComponent,
        EditCategoryComponent,
        EditUserComponent,
        EditRentalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class FormModule {
}
