import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropService } from 'src/app/services/drop/drop.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Drop } from 'src/app/models/Drop.model';
import { formatDate } from '../../../utils/Functions/format-date';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import {
  firstValueFrom,
  map,
  Observable,
  retry,
  startWith,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-new-drop',
  templateUrl: './new-drop.component.html',
  styleUrls: ['./new-drop.component.css'],
})
export class NewDropComponent implements OnInit, OnDestroy {
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
  ) {}
  ngOnDestroy(): void {
    this.campaignNameSubscription.unsubscribe();
  }
  searchText: any;
  actionButton: string = 'Save';
  dropForm = new FormGroup({
    campaignName: new FormControl('', Validators.required),
    campaignNumber: new FormControl('', Validators.required),
    dropDate: new FormControl('', Validators.required),
    dropNumber: new FormControl('', Validators.required),
    dropVolume: new FormControl('', Validators.required),
    isLastDrop: new FormControl(),
    isDropCompleted: new FormControl(),
    SeededReceived: new FormControl(),
    nextAvailableDates: new FormControl('', Validators.required),
    attachments: new FormControl(''),
  });

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  campaignNameSubscription!: Subscription;
  ngOnInit(): void {
    this.campaignNameSubscription = this.campaignService
      .getAllCampaigns()
      .subscribe((res) => {
        res.forEach((campaign) => {
          this.options.push(campaign.campaignName);
        });
        this.filteredOptions = this.dropForm.controls[
          'campaignName'
        ].valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || ''))
        );
      });

    if (this.editMode) {
      this.data = this.editMode;
      this.actionButton = 'Edit';
      this.dropForm.controls['campaignName'].setValue(
        this.editMode.campaignName
      );
      this.dropForm.controls['campaignNumber'].setValue(
        this.editMode.campaignNumber
      );
      this.dropForm.controls['dropDate'].setValue(this.editMode.dropDate);
      this.dropForm.controls['dropNumber'].setValue(this.editMode.dropNumber);
      this.dropForm.controls['dropVolume'].setValue(this.editMode.dropVolume);
      this.dropForm.controls['isLastDrop'].setValue(this.editMode.isLastDrop);
      this.dropForm.controls['isDropCompleted'].setValue(
        this.editMode.isDropCompleted
      );
      this.dropForm.controls['SeededReceived'].setValue(
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

  get campaignNumber() {
    return this.dropForm.get('campaignNumber');
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

  get isLastDrop() {
    return this.dropForm.get('isLastDrop');
  }

  get isDropCompleted() {
    return this.dropForm.get('isDropCompleted');
  }

  get isSeededReceived() {
    return this.dropForm.get('SeededReceived');
  }

  get nextAvailableDates() {
    return this.dropForm.get('nextAvailableDates');
  }

  getDropObject(): Drop {
    const {
      campaignName,
      campaignNumber,
      dropDate,
      dropNumber,
      dropVolume,
      isLastDrop,
      isDropCompleted,
      // SeededReceived,
      // nextAvailableDates,
    } = this.dropForm.value;
    const dropObject = {
      campaignName,
      campaignNumber,
      dropDate: formatDate(dropDate, this.datePipe),
      dropNumber,
      dropVolume,
      isLastDrop,
      isDropCompleted,
      // SeededReceived,
      // nextAvailableDates,
    };
    return dropObject as any;
  }
  campaignByUniqueNumberSubscription!: Subscription;
  addDrop() {
    if (!this.editMode) {
      // this.campaignService.getCampaignById('');
      // this.campaignByUniqueNumberSubscription = this.campaignService
      //   .getCampaignByUniqueNumber('')
      //   .subscribe((res) => {});
      // this.campaignService.get
      // this.dropService
      //   .saveDrop(this.getDropObject()).subscribe()
      //   .pipe(
      //     this.toast.observe({
      //       success: 'drop saved successfuly',
      //       loading: 'Saving ...',
      //       error: 'There was a error',
      //     })
      //   )
      //   .subscribe(() => {
      //     this.dropForm.reset();
      //     this.dialogRef.close('save');
      //   });
      return;
    }
    this.updatedrop(this.editMode);
  }

  updateCampaignSubscription!: Subscription;

  async updatedrop(dropToUpdate: Drop) {
    const campaign$ = this.campaignService.getCampaignById(
      dropToUpdate.campaignId
    );
    const campaign = await firstValueFrom(campaign$);

    campaign.drops[dropToUpdate.dropNumber - 1].dropDate =
      this.getDropObject().dropDate;
    campaign.drops[dropToUpdate.dropNumber - 1].dropVolume =
      this.getDropObject().dropVolume;
    campaign.drops[dropToUpdate.dropNumber - 1].isDropCompleted =
      this.getDropObject().isDropCompleted;
    campaign.drops[dropToUpdate.dropNumber - 1].isDropCompleted =
      this.getDropObject().isDropCompleted;
    campaign.drops[dropToUpdate.dropNumber - 1].isLastDrop =
      this.getDropObject().isLastDrop;

    if (this.getDropObject().isDropCompleted === true) {
      if (
        campaign.drops[dropToUpdate.dropNumber - 2] &&
        campaign.drops[dropToUpdate.dropNumber - 2].isDropCompleted === false
      ) {
        alert(
          `the drop number ${
            dropToUpdate.dropNumber - 1
          } is not completed, it should be completed before this one`
        );
        return;
      }
      if (dropToUpdate.dropNumber + 1 <= campaign.totalDropsNumber) {
        campaign.currentDropNumber = dropToUpdate.dropNumber + 1;
      }
    }
    this.updateCampaignSubscription = this.campaignService
      .updateCampaign(dropToUpdate.campaignId, campaign)
      .pipe(
        this.toast.observe({
          success: 'drop updated successfuly',
          loading: 'Editing ...',
          error: 'Thre was an error when updating this drop',
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
