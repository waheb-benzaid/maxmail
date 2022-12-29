import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { firstValueFrom, Subscription } from 'rxjs';
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
export class NewHiatusDatesComponent implements OnInit, OnDestroy {
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

  getHiatusdates!: Subscription;
  hiatusDates: string[] = [];
  ngOnInit(): void {
    if (this.editData) {
      this.actionButton = 'Edit';
    }

    this.getHiatusdates = this.hiatusDateService
      .getHiatusDates()
      .subscribe((res) => {
        if (res) {
          this.hiatusDates.length = 0;
          res.forEach((hiatusDatesObject) => {
            this.hiatusDates.push(hiatusDatesObject.hiatusDate);
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.hiatusDateSubscription) {
      this.hiatusDateSubscription.unsubscribe();
    }
  }

  hiatusDatesForm = new FormGroup({
    hiatusDateDescription: new FormControl('', Validators.required),
    hiatusDate: new FormControl('', Validators.required),
  });

  hiatusDateExsists: boolean = false;
  hiatusDateSubscription!: Subscription;

  get hiatusDateDescription() {
    return this.hiatusDatesForm.get('dateDescription');
  }

  get hiatusDate() {
    return this.hiatusDatesForm.get('hiatusDate');
  }

  addHiatusDate() {
    const hiatusDatesObject = {
      hiatusDateDescription: this.hiatusDatesForm.value.hiatusDateDescription,
      hiatusDate: formatDate(
        this.hiatusDatesForm.value.hiatusDate,
        this.datePipe
      ),
    };

    if (!this.hiatusDatesForm.valid) {
      window.alert('fields are not valid! please confirm before saving');
      return;
    }

    const typedHiatusDate = this.hiatusDatesForm.controls['hiatusDate'].value
      ? formatDate(
          this.hiatusDatesForm.controls['hiatusDate'].value,
          this.datePipe
        )
      : '';

    const dateExists = typedHiatusDate
      ? this.hiatusDates.includes(typedHiatusDate)
      : '';

    if (dateExists) {
      window.alert('hiatus date exists yet');
      this.hiatusDatesForm.reset();
      return;
    }
    if (!this.editData) {
      this.hiatusDateSubscription = this.hiatusDateService
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
    } else {
      this.updateHiatusDate(this.editData, hiatusDatesObject);
    }
  }

  updateHiatusDate(id: string, dataToUpdate: HiatusDate) {
    this.hiatusDateService
      .updateHiatusDate(id, dataToUpdate)
      .pipe(
        this.toast.observe({
          success: 'Hiatus date edited successfuly',
          loading: 'Editing ...',
          error: 'There was a error',
        })
      )
      .subscribe((res) => {
        this.hiatusDatesForm.reset();
        this.dialogRef.close('update');
      });
  }
}
