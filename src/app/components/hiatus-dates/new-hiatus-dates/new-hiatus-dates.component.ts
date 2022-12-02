import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Drop } from 'src/app/models/Drop.model';
import { HiatusDate } from 'src/app/models/HiatusDates.model';
import { DropService } from 'src/app/services/drop/drop.service';
import { HiatusDatesService } from 'src/app/services/hiatus-dates/hiatus-dates.service';
import { formatDate } from 'src/app/utils/Functions/format-date';
import { LoginComponent } from '../../login/login.component';

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
    private datePipe: DatePipe,
    private dropService: DropService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.dropService.isDropDateHiatus();
  }
  actionButton: string = 'Save';
  hiatusDatesForm = new FormGroup({
    hiatusDateDescription: new FormControl('', Validators.required),
    hiatusDate: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  get hiatusDateDescription() {
    return this.hiatusDatesForm.get('dateDescription');
  }

  get hiatusDate() {
    return this.hiatusDatesForm.get('hiatusDate');
  }

  setHiatusDatesObject(): HiatusDate {
    const { hiatusDateDescription, hiatusDate } = this.hiatusDatesForm.value;
    return {
      hiatusDateDescription,
      hiatusDate: formatDate(hiatusDate, this.datePipe),
    };
  }

  addHiatusDate() {
    if (!this.hiatusDatesForm.valid) {
      window.alert('fields are not valid! please confirm before saving');
      return;
    }

    let _hiatusDate = '';
    _hiatusDate = this.setHiatusDatesObject().hiatusDate;
    _hiatusDate = _hiatusDate.replace(/-0+/g, '-');
    const hiatusDatesObject = {
      hiatusDateDescription: this.setHiatusDatesObject().hiatusDateDescription,
      hiatusDate: _hiatusDate,
    };
    if (
      //FIXME:
      this.hiatusDateService.hiatusDatesArray.includes(
        hiatusDatesObject.hiatusDate
      )
    ) {
      window.alert('this date exists yet');
      return;
    }

    let array = this.dropService.isDropDateHiatus();

    if (array.includes(hiatusDatesObject.hiatusDate)) {
      window.alert(
        'it is not possible to create this hiatus date, there is one or more drops in this date'
      );
      array.length = 0;
      return;
    }

    this.hiatusDateService
      .saveHiatusDate(hiatusDatesObject)
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
