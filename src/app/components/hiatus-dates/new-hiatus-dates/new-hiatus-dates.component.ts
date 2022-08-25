import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-hiatus-dates',
  templateUrl: './new-hiatus-dates.component.html',
  styleUrls: ['./new-hiatus-dates.component.css'],
})
export class NewHiatusDatesComponent implements OnInit {
  constructor() {}
  actionButton: string = 'Save';
  hiatusDatesForm = new FormGroup({
    dateDescription: new FormControl('', Validators.required),
    hiatusDate: new FormControl(Date, Validators.required),
  });

  ngOnInit(): void {}

  get dateDescription() {
    return this.hiatusDatesForm.get('dateDescription');
  }

  get hiatusDate() {
    return this.hiatusDatesForm.get('hiatusDate');
  }

  addHiatusDate() {}
}
