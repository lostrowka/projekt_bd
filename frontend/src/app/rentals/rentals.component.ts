import { Component, OnInit } from '@angular/core';
import { RentalsEntry } from "../models/rentals_entry";

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styles: []
})
export class RentalsComponent implements OnInit {

  rentals: RentalsEntry[];

  constructor() { }

  ngOnInit() {
  }

}
