import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropService } from 'src/app/services/drop/drop.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Drop } from 'src/app/models/Drop.model';
import { formatDate } from '../../../utils/format-date';

@Component({
  selector: 'app-new-drop',
  templateUrl: './new-drop.component.html',
  styleUrls: ['./new-drop.component.css'],
})
export class NewDropComponent implements OnInit {
  constructor(
    private dropService: DropService,
    private toast: HotToastService,
    private dialogRef: MatDialogRef<NewDropComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private datePipe: DatePipe
  ) {
    dropService.getAllDrops();
  }
  actionButton: string = 'Save';
  dropForm = new FormGroup({
    firstDropDate: new FormControl('', Validators.required),
    dropStatus: new FormControl('', Validators.required),
    dropType: new FormControl('', Validators.required),
    firstDropVolume: new FormControl('', Validators.required),
    totaldropVolume: new FormControl('', Validators.required),
    totalDropsNumber: new FormControl('', Validators.required),
    mailerSize: new FormControl('', Validators.required),
    totalHouseholds: new FormControl('', Validators.required),
    totalcontractAmount: new FormControl('', Validators.required),
    printOrderID: new FormControl('', Validators.required),
    accountName: new FormControl('', Validators.required),
    ownerName: new FormControl('', Validators.required),
    contactName: new FormControl('', Validators.required),
    attachments: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    if (this.editData) {
      this.actionButton = 'Edit';
      this.dropForm.controls['firstDropDate'].setValue(
        this.editData.firstDropDate
      );
      this.dropForm.controls['dropStatus'].setValue(this.editData.dropStatus);
      this.dropForm.controls['dropType'].setValue(this.editData.dropType);
      this.dropForm.controls['firstDropVolume'].setValue(
        this.editData.firstDropVolume
      );
      this.dropForm.controls['totaldropVolume'].setValue(
        this.editData.totaldropVolume
      );
      this.dropForm.controls['totalDropsNumber'].setValue(
        this.editData.totalDropsNumber
      );
      this.dropForm.controls['mailerSize'].setValue(this.editData.mailerSize);
      this.dropForm.controls['totalHouseholds'].setValue(
        this.editData.totalHouseholds
      );
      this.dropForm.controls['totalcontractAmount'].setValue(
        this.editData.totalcontractAmount
      );
      this.dropForm.controls['printOrderID'].setValue(
        this.editData.printOrderID
      );
      this.dropForm.controls['accountName'].setValue(this.editData.accountName);
      this.dropForm.controls['ownerName'].setValue(this.editData.ownerName);
      this.dropForm.controls['contactName'].setValue(this.editData.contactName);
      this.dropForm.controls['attachments'].setValue(this.editData.attachments);
    }
  }

  getDropObject(): Drop {
    const {
      firstDropDate,
      dropStatus,
      dropType,
      totaldropVolume,
      firstDropVolume,
      totalDropsNumber,
      mailerSize,
      totalHouseholds,
      totalcontractAmount,
      printOrderID,
      accountName,
      ownerName,
      contactName,
      attachments,
    } = this.dropForm.value;
    const dropObject = {
      firstDropDate: formatDate(firstDropDate, this.datePipe),
      dropStatus,
      dropType,
      firstDropVolume,
      totaldropVolume,
      totalDropsNumber,
      mailerSize,
      totalHouseholds,
      totalcontractAmount,
      printOrderID,
      accountName,
      ownerName,
      contactName,
      attachments,
    };
    return dropObject;
  }

  addDrop() {
    if (!this.editData) {
      this.dropService
        .saveDrop(this.getDropObject())
        .pipe(
          this.toast.observe({
            success: 'drop saved successfuly',
            loading: 'Saving ...',
            error: 'There was a error',
          })
        )
        .subscribe(() => {
          this.dropForm.reset();
          this.dialogRef.close('save');
        });
      return;
    }
    this.updatedrop(this.editData.id);
  }

  updatedrop(id: string) {
    this.dropService
      .updateDrop(id, this.getDropObject())
      .pipe(
        this.toast.observe({
          success: 'drop edited successfuly',
          loading: 'Editing ...',
          error: 'There was a error',
        })
      )
      .subscribe(() => {
        this.dropForm.reset();
        this.dialogRef.close('update');
      });
  }

  deletedrop() {
    this.dropService
      .deleteDrop(this.editData.id)
      .pipe(
        this.toast.observe({
          success: 'drop deleted successfuly',
          loading: 'Deleting ...',
          error: 'There was an error',
        })
      )
      .subscribe(() => {
        console.log('drop deleted');
        this.dialogRef.close('delete');
      });
  }
}
