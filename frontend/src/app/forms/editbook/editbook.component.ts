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
export class EditBookComponent {
    @ViewChild('f', {static: false}) editForm: NgForm;
    book_id: number;
    book: Book;
    authors: Author[];
    categories: Category[];

    constructor(private bookService: BookService, private authorService: AuthorService, private categoryService: CategoryService, private route: ActivatedRoute, private location: Location) {
        this.route.params.subscribe(params => {
            this.book_id = Number(this.route.snapshot.paramMap.get('book_id'));

            if (this.book_id) {
                this.bookService.GetBookById(this.book_id).then((res) => {
                    this.book = res;
                    this.editForm.setValue({
                        title: res.title,
                        author_id: res.author_id,
                        category_id: res.category_id,
                        isbn: res.isbn
                    });
                });
            } else {
                this.book = new Book();
            }

            this.authorService.GetAllAuthors().then((res) => {
                this.authors = res;
            });

            this.categoryService.GetAllCategories().then((res) => {
                this.categories = res;
            });
        });
    }

    onSubmit(form: NgForm) {
        this.book.title = form.value['title'];
        this.book.author_id = form.value['author_id'];
        this.book.category_id = form.value['category_id'];
        this.book.isbn = form.value['isbn'];
        if (this.book_id) {
            this.bookService.UpdateBook(this.book).then(res => {
                if (res.status >= 400) {
                    alert("Błąd " + res.status + ". Error: " + res.statusText);
                } else {
                    this.location.back();
                }
            })
        } else {
            this.bookService.AddBook(this.book).then(res => {
                if (res.status >= 400) {
                    alert("Błąd " + res.status + ". Error: " + res.statusText);
                } else {
                    this.editForm.reset();
                    this.book_id = undefined;
                }
            })
        }
    }

}
