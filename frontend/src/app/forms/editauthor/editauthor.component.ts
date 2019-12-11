import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Author } from "../../models/author";
import { AuthorService } from "../../services/author.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
    selector: 'app-editauthor',
    templateUrl: './editauthor.component.html',
    styles: []
})
export class EditAuthorComponent implements OnInit {

    @ViewChild('f', {static: false}) editForm: NgForm;
    mode: string;
    author_id: number;
    author: Author;
    authors: Author[];

    constructor(private authorService: AuthorService, private route: ActivatedRoute, private location: Location) {

        console.log(this.route.snapshot.data['mode']);

        this.mode = this.route.snapshot.data['mode'];

        if (!this.mode.toString().localeCompare("edit")) {
            this.authorService.GetAllAuthors().then((res) => {
                this.authors = res;
            });
        } else {
            this.author = new Author();
        }
    }

    ngOnInit() {

    }

    onSubmit(form: NgForm) {
        this.author.first_name = form.value['first_name'];
        this.author.last_name = form.value['last_name'];
        this.author.origin = form.value['origin'];
        if (this.author_id) {
            this.authorService.UpdateAuthor(this.author).then(res => {
                if (res.status >= 400) {
                    alert("Błąd " + res.status + ". Error: " + res.statusText);
                } else {
                    this.editForm.reset();
                    this.author_id = undefined;
                }
            })
        } else {
            this.authorService.AddAuthor(this.author).then(res => {
                if (res.status >= 400) {
                    alert("Błąd " + res.status + ". Error: " + res.statusText);
                } else {
                    this.editForm.reset();
                    this.author_id = undefined;
                }
            })
        }
    }

    onDelete(id: number) {

    }

    onChange() {
        this.author_id = this.editForm.value["author"];
        this.authorService.GetAuthorById(this.author_id).then((res) => {
            this.author = res;
            this.editForm.setValue({
                author: this.author_id,
                first_name: res.first_name,
                last_name: res.last_name,
                origin: res.origin
            });
        });
    }
}
