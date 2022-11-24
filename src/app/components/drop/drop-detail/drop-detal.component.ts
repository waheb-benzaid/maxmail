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
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private datePipe: DatePipe,
    private campaignService: CampaignService
  ) {
    // dropService.getAllDrops();
    this.options = campaignService.getAllCampaignsNames();
  }
  // isDropCompleted = false;
  // isLastDrop = false;
  // isSeededReceived = false;
  actionButton: string = 'Save';
  dropForm = new FormGroup({
    campaignName: new FormControl({ disable: true }),
    dropDate: new FormControl({ disable: true }),
    dropNumber: new FormControl({ disable: true }),
    dropVolume: new FormControl({ disable: true }),
    isLastDrop: new FormControl({ disable: true }),
    isDropCompleted: new FormControl({ disable: true }),
    isSeededReceived: new FormControl({ disable: true }),
    nextAvailableDates: new FormControl({ disable: true }),
  });

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.dropForm.controls['campaignName'].setValue(this.editData.campaignName);
    this.dropForm.controls['dropDate'].setValue(this.editData.dropDate);
    this.dropForm.controls['dropNumber'].setValue(this.editData.dropNumber);
    this.dropForm.controls['dropVolume'].setValue(this.editData.dropVolume);
    this.dropForm.controls['isLastDrop'].setValue(this.editData.isLastDrop);
    this.dropForm.controls['isDropCompleted'].setValue(
      this.editData.isDropCompleted
    );
    this.dropForm.controls['isSeededReceived'].setValue(
      this.editData.isSeededReceived
    );
    this.dropForm.controls['nextAvailableDates'].setValue(
      this.editData.nextAvailableDates
    );
  }
}
