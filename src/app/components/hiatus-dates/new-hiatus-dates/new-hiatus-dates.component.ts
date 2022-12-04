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
  ngOnDestroy(): void {
    if (this.hiatusDateSubscription) {
      this.hiatusDateSubscription.unsubscribe();
    }
  }
  actionButton: string = 'Save';
  hiatusDatesForm = new FormGroup({
    hiatusDateDescription: new FormControl('', Validators.required),
    hiatusDate: new FormControl('', Validators.required),
  });
  hiatusDateExsists: boolean = false;
  hiatusDateSubscription!: Subscription;
  ngOnInit(): void {}

  get hiatusDateDescription() {
    return this.hiatusDatesForm.get('dateDescription');
  }

  get hiatusDate() {
    return this.hiatusDatesForm.get('hiatusDate');
  }

  async addHiatusDate() {
    if (!this.hiatusDatesForm.valid) {
      window.alert('fields are not valid! please confirm before saving');
      return;
    }

    const hiatusDate$ = this.hiatusDateService.getHiatusDateByID(
      formatDate(this.hiatusDatesForm.value.hiatusDate, this.datePipe)!
    );

    const hiatusDate = await firstValueFrom(hiatusDate$);
    this.toast.loading('saving');
    this.toast.close();
    if (hiatusDate) {
      window.alert('hiatus date exists yet');
      return;
    }

    const hiatusDatesObject = {
      hiatusDateDescription: this.hiatusDatesForm.value.hiatusDateDescription,
      hiatusDate: formatDate(
        this.hiatusDatesForm.value.hiatusDate,
        this.datePipe
      ),
    };

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
  }
}
