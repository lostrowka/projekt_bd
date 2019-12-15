import { Component, OnInit } from '@angular/core';
import { RentalsEntry } from "../models/rentals_entry";
import { RentalsEntryService } from "../services/rentals_entry.service";
import { RentalsService } from "../services/rentals.service";

@Component({
    selector: 'app-rentals',
    templateUrl: './rentals.component.html',
    styles: []
})
export class RentalsComponent implements OnInit {

    rentals: RentalsEntry[];

    constructor(private rentalsEntryService: RentalsEntryService, private rentalsService: RentalsService) {
    }

    ngOnInit() {
        this.rentalsEntryService.GetAllRentals().then((res) => {
            console.log("Success");
            this.rentals = res;
        })
    }


    deleteEntry(id: number) {
        this.rentalsService.DeleteRental(id).then((res) => {
            if(res.status == 200) {
                if (confirm("Pomyślnie usunięto")) {
                    this.rentals = this.rentals.filter(x => x.id != id);
                }
            }
        })
    }
}
