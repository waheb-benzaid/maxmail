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
import { NewDropComponent } from '../new-drop/new-drop.component';

@Component({
  selector: 'app-drop-detal',
  templateUrl: './drop-detal.component.html',
  styleUrls: ['./drop-detal.component.css'],
})
export class DropDetalComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
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

    console.log(this.options);
  }
  // isDropCompleted = false;
  // isLastDrop = false;
  // isSeededReceived = false;
  actionButton: string = 'Save';
  dropForm = new FormGroup({
    campaignName: new FormControl('', Validators.required),
    dropDate: new FormControl('', Validators.required),
    dropNumber: new FormControl('', Validators.required),
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

    console.log(this.editMode.isLastDrop);
    console.log(this.editMode.isDropCompleted);
    console.log(this.editMode.isSeededReceived);

    this.dropForm.controls['campaignName'].setValue(this.editMode.campaignName);
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

  // get campaignName() {
  //   return this.dropForm.get('campaignName');
  // }

  // get dropDate() {
  //   return this.dropForm.get('dropDate');
  // }

  // get dropNumber() {
  //   return this.dropForm.get('dropNumber');
  // }

  // get dropVolume() {
  //   return this.dropForm.get('dropVolume');
  // }

  // get _isLastDrop() {
  //   return this.dropForm.get('isLastDrop');
  // }

  // get _isDropCompleted() {
  //   return this.dropForm.get('isDropCompleted');
  // }

  // get _isSeededReceived() {
  //   return this.dropForm.get('isSeededReceived');
  // }

  // get nextAvailableDates() {
  //   return this.dropForm.get('nextAvailableDates');
  // }
}
