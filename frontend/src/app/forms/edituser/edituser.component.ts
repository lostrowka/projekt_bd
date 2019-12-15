import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
    selector: 'app-edituser',
    templateUrl: './edituser.component.html',
    styles: []
})
export class EditUserComponent {
    @ViewChild('f', {static: false}) editForm: NgForm;
    mode: string;
    user_id: number;
    user: User;
    users: User[];

    constructor(private userService: UserService, private route: ActivatedRoute, private location: Location) {

        console.log(this.route.snapshot.data['mode']);

        this.mode = this.route.snapshot.data['mode'];

        if (!this.mode.toString().localeCompare("edit")) {
            this.userService.GetAllUsers().then((res) => {
                this.users = res;
            });
        } else {
            this.user = new User();
        }
    }

    onSubmit(form: NgForm) {
        this.user.first_name = form.value['first_name'];
        this.user.last_name = form.value['last_name'];
        this.user.email = form.value['email'];
        if (this.user_id) {
            this.userService.UpdateUser(this.user).then(res => {
                if (res.status >= 400) {
                    alert("Błąd " + res.status + ". Error: " + res.statusText);
                } else {
                    this.editForm.reset();
                    this.user_id = undefined;
                }
            })
        } else {
            this.userService.AddUser(this.user).then(res => {
                if (res.status >= 400) {
                    alert("Błąd " + res.status + ". Error: " + res.statusText);
                } else {
                    this.editForm.reset();
                    this.user_id = undefined;
                }
            })
        }
    }

    onDelete() {
        this.userService.DeleteUser(this.user_id).then((res) => {
            if(res.status == 200) {
                if (confirm("Pomyślnie usunięto")) {
                    this.editForm.reset();
                    this.user_id = undefined;
                }
            }
        });
    }

    onChange() {
        this.user_id = this.editForm.value["user"];
        this.userService.GetUserById(this.user_id).then((res) => {
            this.user = res;
            this.editForm.setValue({
                user: this.user_id,
                first_name: res.first_name,
                last_name: res.last_name,
                email: res.email
            });
        });
    }
}
