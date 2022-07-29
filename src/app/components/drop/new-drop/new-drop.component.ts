import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropService } from 'src/app/services/drop/drop.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Drop } from 'src/app/models/Drop.model';
import { formatDate } from '../../../utils/format-date';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-new-drop',
  templateUrl: './new-drop.component.html',
  styleUrls: ['./new-drop.component.css'],
})
export class NewDropComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  constructor(
    private dropService: DropService,
    private toast: HotToastService,
    private dialogRef: MatDialogRef<NewDropComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private datePipe: DatePipe,
    private campaignService: CampaignService
  ) {
    dropService.getAllDrops();
    this.options = campaignService.getAllCampaignsNames();
    console.log('options');

    console.log(this.options);
  }
  isDropCompleted = false;
  isLastDrop = false;
  isSeededReceived = false;
  actionButton: string = 'Save';
  dropForm = new FormGroup({
    campaignName: new FormControl('', Validators.required),
    isLastDrop: new FormControl('', Validators.required),
    isDropCompleted: new FormControl('', Validators.required),
    isSeededReceived: new FormControl('', Validators.required),
    nextAvailableDates: new FormControl('', Validators.required),
  });
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  ngOnInit(): void {
    this.filteredOptions = this.dropForm.controls[
      'campaignName'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    // if (this.editData) {
    //   this.actionButton = 'Edit';
    //   this.dropForm.controls['firstDropDate'].setValue(
    //     this.editData.firstDropDate
    //   );
    //   this.dropForm.controls['dropStatus'].setValue(this.editData.dropStatus);
    //   this.dropForm.controls['dropType'].setValue(this.editData.dropType);
    //   this.dropForm.controls['firstDropVolume'].setValue(
    //     this.editData.firstDropVolume
    //   );
    //   this.dropForm.controls['totaldropVolume'].setValue(
    //     this.editData.totaldropVolume
    //   );
    //   this.dropForm.controls['totalDropsNumber'].setValue(
    //     this.editData.totalDropsNumber
    //   );
    //   this.dropForm.controls['mailerSize'].setValue(this.editData.mailerSize);
    //   this.dropForm.controls['totalHouseholds'].setValue(
    //     this.editData.totalHouseholds
    //   );
    //   this.dropForm.controls['totalcontractAmount'].setValue(
    //     this.editData.totalcontractAmount
    //   );
    //   this.dropForm.controls['printOrderID'].setValue(
    //     this.editData.printOrderID
    //   );
    //   this.dropForm.controls['accountName'].setValue(this.editData.accountName);
    //   this.dropForm.controls['ownerName'].setValue(this.editData.ownerName);
    //   this.dropForm.controls['contactName'].setValue(this.editData.contactName);
    //   this.dropForm.controls['attachments'].setValue(this.editData.attachments);
    // }
  }

  getDropObject(): Drop {
    const {
      campaignName,
      isLastDrop,
      isDropCompleted,
      isSeededReceived,
      nextAvailableDates,
    } = this.dropForm.value;
    const dropObject = {
      campaignName,
      isLastDrop,
      isDropCompleted,
      isSeededReceived,
      nextAvailableDates,
    };
    return dropObject;
  }

  addDrop() {
    if (!this.editData) {
      this.dropService
        .saveDrop(this.dropForm.value)
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
      //this.saveDropsInCampaigns();
    }
    // this.updatedrop(this.editData.id);

    // this.campaignService
    //   .updateCampaign(
    //     this.campaignService.getCampaignIdByName(
    //       this.getDropObject().campaignName
    //     ),
    //     this.getDropObject()
    //   )
    //   .pipe(
    //     this.toast.observe({
    //       success: 'Drop added successfuly',
    //       loading: 'Saving ...',
    //       error: 'There was a error',
    //     })
    //   )
    //   .subscribe(() => {
    //     this.dropForm.reset();
    //     this.dialogRef.close('update');
    //   });
  }

  saveDropsInCampaigns() {
    // this.dropService.getAllDrops().subscribe((res) => {
    //   for (const iterator of <Drop[]>res) {
    //     dropsArray.push(iterator);
    //   }
    // });
    let drop = this.dropService.getDropByCampaignName(
      this.getDropObject().campaignName
    );
    this.campaignService.updateCampaign(
      this.campaignService.getCampaignIdByName(
        this.getDropObject().campaignName
      ),
      { drops: drop }
    );
  }

  updatedrop(id: string) {
    //   this.dropService
    //     .updateDrop(id, this.getDropObject())
    //     .pipe(
    //       this.toast.observe({
    //         success: 'drop edited successfuly',
    //         loading: 'Editing ...',
    //         error: 'There was a error',
    //       })
    //     )
    //     .subscribe(() => {
    //       this.dropForm.reset();
    //       this.dialogRef.close('update');
    //     });
  }

  deletedrop() {
    //   this.dropService
    //     .deleteDrop(this.editData.id)
    //     .pipe(
    //       this.toast.observe({
    //         success: 'drop deleted successfuly',
    //         loading: 'Deleting ...',
    //         error: 'There was an error',
    //       })
    //     )
    //     .subscribe(() => {
    //       console.log('drop deleted');
    //       this.dialogRef.close('delete');
    //     });
  }

  //filterListCareUnit(param: any) {}

  // onKey(value: any) {
  //   this.selectedCNames = this.search(value);
  // }
  // //**// Filter the states list and send back to populate the selectedStates**
  // search(value: string) {
  //   let filter = value.toLowerCase();
  //   return this.campaignsNames.filter((option) =>
  //     option.toLowerCase().startsWith(filter)
  //   );
  // }
}
