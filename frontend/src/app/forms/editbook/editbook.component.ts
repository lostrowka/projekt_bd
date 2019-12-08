import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from "../../models/book";
import { ActivatedRoute } from "@angular/router";
import { BookService } from "../../services/book.service";
import { NgForm } from "@angular/forms";
import { Location } from '@angular/common';
import { Author } from "../../models/author";
import { AuthorService } from "../../services/author.service";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/category";

@Component({
    selector: 'app-editbook',
    templateUrl: './editbook.component.html',
    styles: []
})
export class EditBookComponent implements OnInit {
    @ViewChild('f', {static: false}) editForm: NgForm;
    book_id: number;
    book: Book;
    authors: Author[];
    categories: Category[];

    constructor(private bookService: BookService, private authorService: AuthorService, private categoryService: CategoryService, private route: ActivatedRoute, private location: Location) {
        this.route.params.subscribe(params => {
            console.log(this.route.snapshot.data['mode']);

            this.book_id = Number(this.route.snapshot.paramMap.get('book_id'));

            if (this.book_id) {
                this.bookService.GetBookById(this.book_id).then((res) => {
                    this.editForm.setValue({
                        title: res.title,
                        author: res.author,
                        category: res.category,
                        isbn: res.isbn
                    });
                });
            }

            this.authorService.GetAllAuthors().then((res) => {
                this.authors = res;
            });

            this.categoryService.GetAllCategories().then((res) => {
                this.categories = res;
            });
        });
    }

    ngOnInit() {

    }

    onSubmit(form: NgForm) {
        console.log("Submit");
        if (this.book_id) {
            console.log("Edit");
        } else {
            console.log("Add");
        }
    }

}
