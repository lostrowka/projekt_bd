import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Book } from "../../models/book";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { RentalsService } from "../../services/rentals.service";
import { UserService } from "../../services/user.service";
import { BookService } from "../../services/book.service";
import { User } from "../../models/user";
import { Rental } from "../../models/rental";

@Component({
    selector: 'app-edit-rental',
    templateUrl: './editrental.component.html',
    styles: []
})
export class EditRentalComponent {

    @ViewChild('f', {static: false}) editForm: NgForm;
    rental_id: number;
    rental: Rental;
    books: Book[];
    users: User[];
    date_on: Date;
    date_to: Date;

    constructor(private rentalsService: RentalsService, private bookService: BookService, private userService: UserService, private route: ActivatedRoute, private location: Location) {
        this.route.params.subscribe(params => {
            console.log(this.route.snapshot.data['mode']);

            this.rental_id = Number(this.route.snapshot.paramMap.get('rental_id'));

            if (this.rental_id) {
                this.rentalsService.GetRentalById(this.rental_id).then((res) => {
                    this.rental = res;
                    this.editForm.setValue({
                        book_id: res.book_id,
                        user_id: res.user_id,
                        date_on: res.date_on,
                        date_to: res.date_to
                    });
                });
            } else {
                this.rental = new Rental();
            }

            this.bookService.GetAllBooks().then((res) => {
                this.books = res;
            });

            this.userService.GetAllUsers().then((res) => {
                this.users = res;
            });
        });
    }

    onSubmit(form: NgForm) {
        this.rental.book_id = form.value['book_id'];
        this.rental.user_id = form.value['user_id'];
        this.rental.date_on = form.value['date_on'];
        this.rental.date_to = form.value['date_to'];
        if (this.rental_id) {
            this.rentalsService.UpdateRental(this.rental).then(res => {
                if (res.status >= 400) {
                    alert("Błąd " + res.status + ". Error: " + res.statusText);
                } else {
                    this.location.back();
                }
            })
        } else {
            this.rentalsService.AddRental(this.rental).then(res => {
                if (res.status >= 400) {
                    alert("Błąd " + res.status + ". Error: " + res.statusText);
                } else {
                    this.editForm.reset();
                    this.location.back();
                }
            })
        }
    }

}
