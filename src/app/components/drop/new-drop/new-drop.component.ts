import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropService } from 'src/app/services/drop/drop.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Drop } from 'src/app/models/Drop.model';
import { formatDate } from '../../../utils/Functions/format-date';
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
  public data: any;
  constructor(
    private dropService: DropService,
    private toast: HotToastService,
    private dialogRef: MatDialogRef<NewDropComponent>,
    @Inject(MAT_DIALOG_DATA) public editMode: any,
    private datePipe: DatePipe,
    private campaignService: CampaignService
  ) {
    dropService.getAllDrops();
    this.options = campaignService.getAllCampaignsNames();
    console.log('options');
  }
  searchText: any;
  actionButton: string = 'Save';
  dropForm = new FormGroup({
    campaignName: new FormControl('', Validators.required),
    searchCampaignName: new FormControl('', Validators.required),
    dropDate: new FormControl('', Validators.required),
    dropNumber: new FormControl(0, Validators.required),
    dropVolume: new FormControl('', Validators.required),
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
    if (this.editMode) {
      this.data = this.editMode;
      this.actionButton = 'Edit';
      this.dropForm.controls['campaignName'].setValue(
        this.editMode.campaignName
      );
      this.dropForm.controls['dropDate'].setValue(this.editMode.dropDate);
      this.dropForm.controls['dropNumber'].setValue(this.editMode.dropNumber);
      this.dropForm.controls['dropVolume'].setValue(this.editMode.dropVolume);
      this.dropForm.controls['isLastDrop'].setValue(this.editMode.isLastDrop);
      this.dropForm.controls['isDropCompleted'].setValue(
        this.editMode.isDropCompleted
      );
      this.dropForm.controls['isSeededReceived'].setValue(
        this.editMode.isSeededReceived
      );
      this.dropForm.controls['nextAvailableDates'].setValue(
        this.editMode.nextAvailableDates
      );
    }
  }
  onKey(value: any) {
    this.options = this._filter(value);
  }

  // **// Filter the states list and send back to populate the selectedStates**
  // search(value: string) {
  //     let filter = value.toLowerCase();
  //     return this.states.filter(option => option.toLowerCase().startsWith(filter));
  //   }
  get campaignName() {
    return this.dropForm.get('campaignName');
  }

  get dropDate() {
    return this.dropForm.get('dropDate');
  }

  get dropNumber() {
    return this.dropForm.get('dropNumber');
  }

  get dropVolume() {
    return this.dropForm.get('dropVolume');
  }

  get _isLastDrop() {
    return this.dropForm.get('isLastDrop');
  }

  get _isDropCompleted() {
    return this.dropForm.get('isDropCompleted');
  }

  get _isSeededReceived() {
    return this.dropForm.get('isSeededReceived');
  }

  get nextAvailableDates() {
    return this.dropForm.get('nextAvailableDates');
  }

  getDropObject(): Drop {
    const {
      campaignName,
      dropDate,
      dropNumber,
      dropVolume,
      isLastDrop,
      isDropCompleted,
      isSeededReceived,
      nextAvailableDates,
    } = this.dropForm.value;
    const dropObject = {
      campaignName,
      dropDate: formatDate(dropDate, this.datePipe),
      dropNumber,
      dropVolume,
      isLastDrop,
      isDropCompleted,
      isSeededReceived,
      nextAvailableDates,
    };
    return dropObject as any;
  }

  addDrop() {
    if (!this.editMode) {
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
    }
    this.updatedrop(this.editMode.id);
  }

  updatedrop(id: string) {
    this.dropService
      .updateDrop(id, this.dropForm.value)
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
      .deleteDrop(this.editMode.id)
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
