import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/category";

@Component({
    selector: 'app-editcategory',
    templateUrl: './editcategory.component.html',
    styles: []
})
export class EditCategoryComponent implements OnInit {

    @ViewChild('f', {static: false}) editForm: NgForm;
    mode: string;
    category_id: number;
    category: Category;
    categories: Category[];

    constructor(private categoryService: CategoryService, private route: ActivatedRoute, private location: Location) {

        console.log(this.route.snapshot.data['mode']);

        this.mode = this.route.snapshot.data['mode'];

        if (!this.mode.toString().localeCompare("edit")) {
            this.categoryService.GetAllCategories().then((res) => {
                this.categories = res;
            });
        } else {
            this.category = new Category();
        }
    }

    ngOnInit() {

    }

    onSubmit(form: NgForm) {
        this.category.name = form.value['name'];
        if (this.category_id) {
            this.categoryService.UpdateCategory(this.category).then(res => {
                if (res.status >= 400) {
                    alert("Błąd " + res.status + ". Error: " + res.statusText);
                } else {
                    this.editForm.reset();
                    this.category_id = undefined;
                }
            })
        } else {
            this.categoryService.AddCategory(this.category).then(res => {
                console.log(res.status);
                console.log("AAAAA");
                if (res.status >= 400) {
                    alert("Błąd " + res.status + ". Error: " + res.statusText);
                } else {
                    this.editForm.reset();
                    this.category_id = undefined;
                }
            })
        }
    }

    onDelete(id: number) {

    }

    onChange() {
        this.category_id = this.editForm.value["category"];
        this.categoryService.GetCategoryById(this.category_id).then((res) => {
            this.editForm.setValue({
                category: this.category_id,
                name: res.name
            });
        });
    }

}
