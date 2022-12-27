import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { COMMA, ENTER, P } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ZipCode } from 'src/app/models/Zipcode.model';
import { ZipCodeService } from 'src/app/services/zip-code/zip-code.service';
import { DropvolumeDatesService } from 'src/app/services/dropvolume-dates/dropvolume-dates.service';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { VolumeDates } from 'src/app/models/VolumeDates.model';
import { CampaignStatus } from 'src/app/utils/Enums/Campaign Enums/CampaignStatus';
import { CampaignTypes } from 'src/app/utils/Enums/Campaign Enums/CampaignType';
import { UserService } from 'src/app/services/user/user.service';
import { UserModel } from 'src/app/models/User.model';
import { dropCreationMode } from 'src/app/utils/Enums/Drop Enums/DropCreationModes';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
  providers: [DatePipe],
})
export class CampaignComponent implements OnInit, OnDestroy {
  lastCreatedCampaign!: Subscription;
  campaignNumber = 0;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  zipCodes: ZipCode[] = [];
  campaignNames: string[] = [];
  constructor(
    private campaignService: CampaignService,
    private toast: HotToastService,
    private zipCodeService: ZipCodeService,
    private dialogRef: MatDialogRef<CampaignComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private datePipe: DatePipe,
    private dropService: DropService,
    private hiatusDatesService: HiatusDatesService,
    private router: Router,
    private dropVolumeDateService: DropvolumeDatesService, //  private dropVolumeDateService: DropvolumeDatesService
    private userService: UserService
  ) {
    // this.campaignNames = this.campaignService.getAllCampaignsNames();
    this.lastCreatedCampaign = this.campaignService
      .getLastCreateedCampaignByNumber()
      .subscribe((res) => {
        if (res) {
          res.map((data) => {
            this.campaignNumber = data.payload.doc.data().campaignNumber;
          });
        }
      });
  }

  actionButton: string = 'Save';
  campaignForm = new FormGroup({
    firstDropDate: new FormControl('', Validators.required),
    campaignStatus: new FormControl('', Validators.required),
    campaignType: new FormControl('', Validators.required),
    firstDropVolume: new FormControl('', Validators.required),
    totalCampaignVolume: new FormControl('', Validators.required),
    totalDropsNumber: new FormControl('', Validators.required),
    mailerSize: new FormControl('', Validators.required),
    totalHouseholds: new FormControl('', Validators.required),
    totalcontractAmount: new FormControl('', Validators.required),
    zipcodes: new FormControl('', Validators.required),
    printOrderID: new FormControl(''),
    accountName: new FormControl('', Validators.required),
    ownerName: new FormControl(''),
    contactName: new FormControl(''),
    attachments: new FormControl(''),
  });

  addZipCode(event: MatChipInputEvent): void {
    let isValueDuplicated = false;
    const value = (event.value || '').trim();
    if (value) {
      if (!this.campaignForm.controls['campaignType'].value) {
        alert('Please enter the campaign type first');
        event.chipInput!.clear();
        return;
      }

      if (value.length !== 5) {
        window.alert('zipcode should be 5 degits');
        event.chipInput!.clear();
        return;
      }

      this.zipCodes.forEach((zipcodeObject) => {
        if (value === zipcodeObject.zipNumber) {
          isValueDuplicated = true;
        }
      });

      if (isValueDuplicated) {
        window.alert('This zip code is duplicated');
        event.chipInput!.clear();
        return;
      }
      //TODO: Create a Function a make this code reusable
      let unavailableExternalMail: boolean = false;
      let unavailableMagazine: boolean = false;
      let unavailablePostCard: boolean = false;
      this.zipCodesList.forEach((zip) => {
        if (value === zip.zipNumber) {
          if (
            zip.unavailableExternalMail &&
            this.campaignForm.controls['campaignType'].value ===
              CampaignTypes.MAILER
          ) {
            unavailableExternalMail = true;
          }
          if (
            zip.unavailableMagazine &&
            this.campaignForm.controls['campaignType'].value ===
              CampaignTypes.MAGAZINE
          ) {
            unavailableMagazine = true;
          }
          if (
            zip.unavailablePostCard &&
            this.campaignForm.controls['campaignType'].value ===
              CampaignTypes.POSTCARD
          ) {
            unavailablePostCard = true;
          }
        }
      });

      if (unavailableExternalMail) {
        window.alert('this zipcode is unavilable for external mailer');
        event.chipInput!.clear();
        return;
      }

      if (unavailableMagazine) {
        alert('this zipcode is unavilable for Magazines');
        event.chipInput!.clear();
        return;
      }

      if (unavailablePostCard) {
        alert('this zipcode is unavilable for Postcard');
        event.chipInput!.clear();
        return;
      }

      this.zipCodes.push(this.zipCodeManager(value));
    }

    event.chipInput!.clear();
  }

  zipCodeManager(zipNumber: string, campaignID?: string) {
    let zipcodesObject = new Object() as ZipCode;
    let campaignType = this.campaignForm.value.campaignType!;
    zipcodesObject.zipNumber = zipNumber;
    zipcodesObject.campaignStatus = this.campaignForm.value.campaignStatus!;
    zipcodesObject.accountName = this.campaignForm.value.accountName;
    switch (campaignType) {
      case CampaignTypes.MAILER:
        zipcodesObject.unavailableExternalMail = true;
        zipcodesObject.unavailablePostCard = false;
        zipcodesObject.unavailableMagazine = false;
        break;
      case CampaignTypes.POSTCARD:
        zipcodesObject.unavailableExternalMail = false;
        zipcodesObject.unavailablePostCard = true;
        zipcodesObject.unavailableMagazine = false;
        break;
      case CampaignTypes.MAGAZINE:
        zipcodesObject.unavailableExternalMail = false;
        zipcodesObject.unavailablePostCard = false;
        zipcodesObject.unavailableMagazine = true;
        break;
    }
    zipcodesObject.campaignID = campaignID!;
    return zipcodesObject;
  }

  remove(zipCode: ZipCode): void {
    const index = this.zipCodes.indexOf(zipCode);
    if (index >= 0) {
      let confirmation = window.confirm(
        'are you sure to remove this zip code ?'
      );
      if (confirmation) {
        this.zipCodes.splice(index, 1);
      }
    }
  }

  volumeSubscription!: Subscription;
  volumeDatesList: VolumeDates[] = [];
  zipCodesSubscription!: Subscription;
  zipCodesList: ZipCode[] = [];
  users$!: Observable<UserModel[]>;
  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
    this.zipCodesSubscription = this.zipCodeService
      .getAllZipcodes()
      .subscribe((res) => {
        res.forEach((zipCode) => {
          this.zipCodesList.push(zipCode);
        });
      });

    this.volumeSubscription = this.dropVolumeDateService
      .getAllVolumeDate()
      .subscribe((res) => {
        res.forEach((vd) => {
          this.volumeDatesList.push(vd);
        });
      });

    if (this.editData) {
      this.actionButton = 'Edit';

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

  getVolume(date: Date): number {
    const _date = formatDate(date, this.datePipe);
    let volumeDate: VolumeDates[] = [];
    volumeDate = this.volumeDatesList.filter((vd) => {
      return vd.date === _date;
    });
    if (volumeDate.length > 0) {
      let volumeArray: number[] = volumeDate[0].volume;
      const volume = volumeArray.reduce((a, b) => {
        return a + b;
      }, 0);
      return volume;
    }
    return 0;
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
    let dropDatesArray: any[] = [];
    for (let i = 1; i <= campaignObject.totalDropsNumber; i++) {
      let objectToInsert = new Object() as Drop;
      let date = new Date();
      objectToInsert.accountName = campaignObject.accountName;
      objectToInsert.contactName = campaignObject.contactName;
      objectToInsert.dropNumber = i;
      objectToInsert.dropName = `${campaignObject.accountName}-${i}-${objectToInsert.dropDate}`;
      objectToInsert.dropVolume =
        i === 1
          ? parseFloat(campaignObject.firstDropVolume)
          : (parseFloat(campaignObject.totalCampaignVolume) -
              parseFloat(campaignObject.firstDropVolume)) /
            (campaignObject.totalDropsNumber - 1);
      objectToInsert.isDropCompleted = false;
      objectToInsert.isLastDrop = i === campaignObject.totalDropsNumber;
      objectToInsert.campaignStatus = campaignObject.campaignStatus;
      objectToInsert.campaignType = campaignObject.campaignType;
      objectToInsert.printOrderID = campaignObject.printOrderID;
      objectToInsert.mailerSize = campaignObject.mailerSize;
      objectToInsert.campaignNumber = campaignObject.campaignNumber;
      objectToInsert.campaignName = campaignObject.campaignName;
      objectToInsert.dropCreationMode = dropCreationMode.autoMode;
      let dateVolume = new Date(dropDate);
      let maxVolume: number =
        this.getVolume(dateVolume) + campaignObject.firstDropVolume;
      let isHiatusDate =
        this.hiatusDatesService.hiatusDatesArray.includes(dropDate);
      while (isHiatusDate || maxVolume >= 50000) {
        date = new Date(date.setDate(date.getDate() + 1));
        day = getDay(date);
        month = getMonth(date) + 1;
        year = getYear(date);
        dropDate = `${year}-${month}-${day}`;
        isHiatusDate =
          this.hiatusDatesService.hiatusDatesArray.includes(dropDate);
        maxVolume =
          this.getVolume(new Date(dropDate)) + campaignObject.firstDropVolume;
      }
      objectToInsert.dropDate = formatDate(dropDate, this.datePipe);
      this.drops.push(objectToInsert);
      date = new Date(dropDate);
      dropDatesArray.push(dropDate);
      if (campaignObject.campaignType === CampaignTypes.MAGAZINE) {
        date = new Date(date.setMonth(date.getMonth() + 3));
      } else {
        date = new Date(date.setDate(date.getDate() + 21));
      }
      day = getDay(date);
      month = getMonth(date) + 1;
      year = getYear(date);
      dropDate = `${year}-${month}-${day}`;
    }
    dropDatesArray.forEach((date) => {
      this.dropVolumeDateService.saveOrUpdateVolumeDate(
        date,
        dropDatesArray.indexOf(date) === 0
          ? campaignObject.firstDropVolume
          : (parseFloat(campaignObject.totalCampaignVolume) -
              parseFloat(campaignObject.firstDropVolume)) /
              (campaignObject.totalDropsNumber - 1),
        campaignObject.campaignStatus,
        this.editData
      );
    });
    return this.drops;
  }

  getCampaignObject(): Campaign {
    let zipcodes: any[] = [];
    this.zipCodes.forEach((zip) => {
      zipcodes.push(zip.zipNumber);
    });
    const {
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
    let campaignNumber =
      this.campaignNumber === 0 ? 1 : this.campaignNumber + 1;
    let campaignName =
      campaignNumber + '/' + this.campaignForm.controls['contactName'].value;
    if (campaignNumber < 10) {
      campaignName = '00' + campaignName;
    }

    if (campaignNumber < 100 && campaignNumber > 10) {
      campaignName = '0' + campaignName;
    }
    //this.getCampaignObject().contactName;
    const dropFieldsfromCampaign = {
      firstDropDate,
      accountName,
      campaignName: campaignName,
      campaignNumber: campaignNumber,
      contactName,
      totalDropsNumber,
      totalCampaignVolume,
      firstDropVolume,
      campaignType,
      campaignStatus,
      printOrderID,
      mailerSize,
    };

    this.createAutoDropsObject(dropFieldsfromCampaign as Campaign, false);
    const campaignObject = {
      campaignNumber: campaignNumber,
      firstDropDate: formatDate(firstDropDate, this.datePipe),
      campaignStatus,
      campaignType,
      campaignName: campaignName,
      firstDropVolume,
      totalCampaignVolume,
      currentDropNumber: 1,
      totalDropsNumber,
      mailerSize,
      totalHouseholds,
      zipCodeNumbers: zipcodes,
      totalcontractAmount,
      printOrderID,
      accountName,
      ownerName,
      contactName,
      drops: this.drops,
      attachments,
      createdAt: '',
      campaignTimestamp: '',
    };
    return campaignObject;
  }
  saveCampaignSubscription!: Subscription;
  addCampaign() {
    if (!this.editData) {
      // if (!this.campaignForm.valid) {
      //   alert('some required fields are empty!');
      //   return;
      // }
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

      this.saveCampaignSubscription = this.campaignService
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

      this.zipCodes.forEach((zipCode) => {
        this.zipCodeService.saveZipcode(
          this.zipCodeManager(
            zipCode.zipNumber,
            this.campaignService.campaignId
          )
        );

        // this.zipCodeService
        //   .getZipCodeById(zipCode.zipNumber)
        //   .subscribe((res) => {
        //     console.log(res, 'before test');
        //     if (res) {
        //       this.zipCodeService.updateZipCode(res.zipNumber, zipCode);
        //     } else
        //       this.zipCodeService.saveZipcode(
        //         this.zipCodeManager(zipCode.zipNumber)
        //       );
        //   });
      });
      this.hiatusDatesService.hiatusDatesArray = [];
      this.zipCodes.length = 0;
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
        if (this.getCampaignObject().campaignStatus !== CampaignStatus.ACTIVE) {
          this.dropVolumeDateService.removeDropVolumeFromCalendar(
            this.getCampaignObject()
          );
        }
        this.campaignForm.reset();
        this.dialogRef.close('update');
      });
  }

  ngOnDestroy(): void {
    this.volumeSubscription.unsubscribe();
    this.lastCreatedCampaign.unsubscribe();
    if (this.saveCampaignSubscription) {
      this.saveCampaignSubscription.unsubscribe();
    }
    if (this.zipCodesSubscription) {
      this.zipCodesSubscription.unsubscribe();
    }
  }
}
