import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { HiatusDate } from 'src/app/models/HiatusDates.model';
import { HiatusDatesService } from 'src/app/services/hiatus-dates/hiatus-dates.service';

@Component({
  selector: 'app-new-hiatus-dates',
  templateUrl: './new-hiatus-dates.component.html',
  styleUrls: ['./new-hiatus-dates.component.css'],
})
export class NewHiatusDatesComponent implements OnInit {
  constructor(
    private hiatusDateService: HiatusDatesService,
    private toast: HotToastService,
    private dialogRef: MatDialogRef<NewHiatusDatesComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  actionButton: string = 'Save';
  hiatusDatesForm = new FormGroup({
    hiatusDateDescription: new FormControl('', Validators.required),
    hiatusDate: new FormControl(Date, Validators.required),
  });

  ngOnInit(): void {}

  get hiatusDateDescription() {
    return this.hiatusDatesForm.get('dateDescription');
  }

  get hiatusDate() {
    return this.hiatusDatesForm.get('hiatusDate');
  }

  addHiatusDate() {
    if (!this.hiatusDatesForm.valid) {
      window.alert('fields are not valid! please confirm  before saving');
      return;
    }
    this.hiatusDateService
      .saveHiatusDate(this.hiatusDatesForm.value as HiatusDate)
      .pipe(
        this.toast.observe({
          success: 'Hiatus date saved successfuly',
          loading: 'Saving ...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.hiatusDatesForm.reset();
        this.dialogRef.close('save');
      });
  }
}
