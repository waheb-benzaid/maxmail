import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/models/Campaign.model';
import {
  formatDate,
  getDay,
  getMonth,
  getYear,
} from '../../../utils/Functions/format-date';
import { DropService } from 'src/app/services/drop/drop.service';
import { Drop } from '../../../models/Drop.model';
import { HiatusDatesService } from 'src/app/services/hiatus-dates/hiatus-dates.service';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ZipCode } from 'src/app/models/Zipcode.model';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
  providers: [DatePipe],
})
export class CampaignComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private toast: HotToastService,
    private dialogRef: MatDialogRef<CampaignComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private datePipe: DatePipe,
    private dropService: DropService,
    private hiatusDatesService: HiatusDatesService,
    private router: Router
  ) {}
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  zipCodes: ZipCode[] = [];

  zipCodeManager(zipNumber: string, CampaignType: string) {
    let zipcodesObject = new Object() as ZipCode;
    zipcodesObject.zipNumber = zipNumber;
    switch (CampaignType) {
      case 'mailer':
        zipcodesObject.anavailableExternalMail = true;
        zipcodesObject.anavailablePostCard = false;
        zipcodesObject.anavailableMagazine = false;
        break;
      case 'postcard':
        zipcodesObject.anavailableExternalMail = false;
        zipcodesObject.anavailablePostCard = true;
        zipcodesObject.anavailableMagazine = false;
        break;
      case 'magazine':
        zipcodesObject.anavailableExternalMail = false;
        zipcodesObject.anavailablePostCard = false;
        zipcodesObject.anavailableMagazine = true;
        break;
    }
    return zipcodesObject;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      if (
        this.campaignService.isCampaignZipcodeUnavailable(
          value,
          this.campaignForm.value.campaignType!
        )
      ) {
        window.alert(
          'this zipcode is unvailable for ' +
            this.campaignForm.value.campaignType
        );
        event.chipInput!.clear();
        return;
      }
      this.zipCodes.push(
        this.zipCodeManager(value, this.campaignForm.value.campaignType!)
      );
    }
    event.chipInput!.clear();
    console.log(this.zipCodes, 'zip codes when adding the value');
  }

  remove(zipCode: ZipCode): void {
    const index = this.zipCodes.indexOf(zipCode);
    if (index >= 0) {
      this.zipCodes.splice(index, 1);
    }
  }

  actionButton: string = 'Save';
  campaignForm = new FormGroup({
    campaignName: new FormControl('', Validators.required),
    firstDropDate: new FormControl('', Validators.required),
    campaignStatus: new FormControl('', Validators.required),
    campaignType: new FormControl('', Validators.required),
    firstDropVolume: new FormControl('', Validators.required),
    totalCampaignVolume: new FormControl('', Validators.required),
    totalDropsNumber: new FormControl('', Validators.required),
    mailerSize: new FormControl('', Validators.required),
    totalHouseholds: new FormControl('', Validators.required),
    totalcontractAmount: new FormControl('', Validators.required),
    zipcodes: new FormControl(),
    printOrderID: new FormControl(''),
    accountName: new FormControl('', Validators.required),
    ownerName: new FormControl(''),
    contactName: new FormControl(''),
    attachments: new FormControl(''),
  });

  ngOnInit(): void {
    if (this.editData) {
      this.actionButton = 'Edit';
      this.campaignForm.controls['campaignName'].setValue(
        this.editData.campaignName
      );
      this.campaignForm.controls['firstDropDate'].setValue(
        this.editData.firstDropDate
      );
      this.campaignForm.controls['campaignStatus'].setValue(
        this.editData.campaignStatus
      );
      this.campaignForm.controls['campaignType'].setValue(
        this.editData.campaignType
      );
      this.campaignForm.controls['firstDropVolume'].setValue(
        this.editData.firstDropVolume
      );
      this.campaignForm.controls['totalCampaignVolume'].setValue(
        this.editData.totalCampaignVolume
      );
      this.campaignForm.controls['totalDropsNumber'].setValue(
        this.editData.totalDropsNumber
      );
      this.campaignForm.controls['mailerSize'].setValue(
        this.editData.mailerSize
      );
      this.campaignForm.controls['totalHouseholds'].setValue(
        this.editData.totalHouseholds
      );
      this.campaignForm.controls['totalcontractAmount'].setValue(
        this.editData.totalcontractAmount
      );
      this.campaignForm.controls['printOrderID'].setValue(
        this.editData.printOrderID
      );
      this.campaignForm.controls['accountName'].setValue(
        this.editData.accountName
      );
      this.campaignForm.controls['ownerName'].setValue(this.editData.ownerName);
      this.campaignForm.controls['contactName'].setValue(
        this.editData.contactName
      );
      this.campaignForm.controls['attachments'].setValue(
        this.editData.attachments
      );
    }
  }

  get campaignName() {
    return this.campaignForm.get('campaignName');
  }

  get firstDropDate() {
    return this.campaignForm.get('firstDropDate');
  }

  get campaignStatus() {
    return this.campaignForm.get('campaignStatus');
  }

  get campaignType() {
    return this.campaignForm.get('campaignType');
  }

  get firstDropVolume() {
    return this.campaignForm.get('firstDropVolume');
  }

  get totalCampaignVolume() {
    return this.campaignForm.get('totalCampaignVolume');
  }

  get totalDropsNumber() {
    return this.campaignForm.get('totalDropsNumber');
  }

  get mailerSize() {
    return this.campaignForm.get('mailerSize');
  }

  get totalHouseholds() {
    return this.campaignForm.get('totalHouseholds');
  }

  get totalcontractAmount() {
    return this.campaignForm.get('totalcontractAmount');
  }

  get accountName() {
    return this.campaignForm.get('accountName');
  }

  get zipcodes() {
    return this.campaignForm.get('zipcodes');
  }

  public drops: Drop[] = [];

  createAutoDropsObject(
    campaignObject: Campaign,
    isEditMode: boolean,
    id?: string
  ) {
    this.drops.length = 0;
    let day = getDay(campaignObject.firstDropDate as Date);
    let month = getMonth(campaignObject.firstDropDate as Date) + 1;
    let year = getYear(campaignObject.firstDropDate as Date);
    let dropDate = `${year}-${month}-${day}`;
    for (let i = 1; i <= campaignObject.totalDropsNumber; i++) {
      let objectToInsert = new Object() as Drop;
      let date = new Date();
      objectToInsert.campaignName = campaignObject.campaignName;
      objectToInsert.dropNumber = i;
      objectToInsert.dropDate = dropDate;
      objectToInsert.dropName = `${campaignObject.accountName}-${i}-${objectToInsert.dropDate}`;
      objectToInsert.dropVolume = campaignObject.firstDropVolume;
      objectToInsert.isDropCompleted = false;
      objectToInsert.isLastDrop = false;
      objectToInsert.isSeededReceived = false;
      this.drops.push(objectToInsert);
      date = new Date(dropDate);
      if (campaignObject.campaignType === 'magazine') {
        date = new Date(date.setMonth(date.getMonth() + 3));
      } else {
        date = new Date(date.setDate(date.getDate() + 21));
      }
      day = getDay(date);
      month = getMonth(date) + 1;
      year = getYear(date);
      dropDate = `${year}-${month}-${day}`;
      dropDate = formatDate(dropDate, this.datePipe) || '';
      let isHiatusDate =
        this.hiatusDatesService.hiatusDatesArray.includes(dropDate);
      while (isHiatusDate) {
        date = new Date(date.setDate(date.getDate() + 1));
        day = getDay(date);
        month = getMonth(date) + 1;
        year = getYear(date);
        dropDate = `${year}-${month}-${day}`;
        isHiatusDate =
          this.hiatusDatesService.hiatusDatesArray.includes(dropDate);
      }
      dropDate = `${year}-${month}-${day}`;
    }
    return this.drops;
  }

  getCampaignObject(): Campaign {
    const {
      campaignName,
      firstDropDate,
      campaignStatus,
      campaignType,
      totalCampaignVolume,
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
    } = this.campaignForm.value;
    const campaignObject = {
      campaignName,
      firstDropDate: formatDate(firstDropDate, this.datePipe),
      campaignStatus,
      campaignType,
      firstDropVolume,
      totalCampaignVolume,
      totalDropsNumber,
      mailerSize,
      totalHouseholds,
      zipcodes: this.zipCodes,
      totalcontractAmount,
      printOrderID,
      accountName,
      ownerName,
      contactName,
      drops: this.drops,
      attachments,
      createdAt: '',
    };
    return campaignObject;
  }

  addCampaign() {
    if (!this.editData) {
      // if (!this.campaignForm.valid) {
      //   alert('some required fields are empty!');
      //   return;
      // }
      console.log(this.zipCodes, 'zipcodes');

      const { firstDropDate } = this.campaignForm.value;
      let date = new Date(firstDropDate!);
      let day = getDay(date);
      let month = getMonth(date) + 1;
      let year = getYear(date);
      let _firstDropDate = `${year}-${month}-${day}`;
      let isHiatusDate =
        this.hiatusDatesService.hiatusDatesArray.includes(_firstDropDate);
      if (isHiatusDate) {
        window.alert('date not available');
        return;
      }
      let createdAt = formatDate(new Date(), this.datePipe);
      this.campaignService
        .saveCampaign(this.getCampaignObject(), createdAt)
        .pipe(
          this.toast.observe({
            success: 'Campaign saved successfuly',
            loading: 'Saving ...',
            error: ({ message }) => `${message}`,
          })
        )
        .subscribe(() => {
          this.campaignForm.reset();
          this.dialogRef.close('save');
        });
      this.hiatusDatesService.hiatusDatesArray = [];
      return;
    }
    this.updateCampaign(this.editData.id);
  }

  updateCampaign(id: string) {
    this.getCampaignObject().campaignID = id;
    this.campaignService
      .updateCampaign(id, this.getCampaignObject())
      .pipe(
        this.toast.observe({
          success: 'Campaign edited successfuly',
          loading: 'Editing ...',
          error: 'There was a error',
        })
      )
      .subscribe(() => {
        this.campaignForm.reset();
        this.dialogRef.close('update');
      });
  }

  deleteCampaign() {
    this.campaignService
      .deleteCampaign(this.editData.id)
      .pipe(
        this.toast.observe({
          success: 'Campaign deleted successfuly',
          loading: 'Deleting ...',
          error: 'There was an error',
        })
      )
      .subscribe(() => {
        console.log('Campaign deleted');
        this.dialogRef.close('delete');
      });
  }
}
