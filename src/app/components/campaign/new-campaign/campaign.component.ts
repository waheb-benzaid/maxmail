import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

interface selectFields {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private toast: HotToastService,
    private dialogRef: MatDialogRef<CampaignComponent>
  ) {
    campaignService.getAllCampaign();
  }
  campaignStatusValue = '';
  mailerSizeValue = '';
  campaignTypeValue = '';
  campaignForm = new FormGroup({
    firstDropDate: new FormControl(Date, Validators.required),
    campaignStatus: new FormControl('', Validators.required),
    campaignType: new FormControl('', Validators.required),
    firstDropVolume: new FormControl('', Validators.required),
    totalCampaignVolume: new FormControl('', Validators.required),
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

  campaignStatusFields: selectFields[] = [
    { value: 'active', viewValue: 'Active' },
    { value: 'suspended', viewValue: 'Suspended' },
    { value: 'cancelled', viewValue: 'Cancelled' },
    { value: 'completed', viewValue: 'Completed' },
  ];

  campaignTypeFields: selectFields[] = [
    { value: 'mailer', viewValue: 'Mailer' },
    { value: 'postcard', viewValue: 'Postcard' },
    { value: 'magazine', viewValue: 'Magazine' },
  ];

  mailerSizeFields: selectFields[] = [
    { value: '8.5 x 17', viewValue: '8.5 x 17' },
    { value: '10 x 18', viewValue: '10 x 18' },
    { value: '5.5 x 8.5', viewValue: '5.5 x 8.5' },
    { value: '6 x 11', viewValue: '6 x 11' },
    { value: '8.5 x 14', viewValue: '8.5 x 14' },
    { value: '8.5 x 11', viewValue: '8.5 x 11' },
  ];

  ngOnInit(): void {}

  get firstDropDate() {
    return this.campaignForm.get('firstDropDate');
  }

  get campaignStatus() {
    return this.campaignStatusValue;
  }

  get campaignType() {
    return this.campaignTypeValue;
  }

  get totalCampaignVolume() {
    return this.campaignForm.get('totalCampaignVolume');
  }

  get firstDropVolume() {
    return this.campaignForm.get('firstDropVolume');
  }

  get totalDropsNumber() {
    return this.campaignForm.get('totalDropsNumber');
  }

  get mailerSize() {
    return this.mailerSizeValue;
  }

  get totalHouseholds() {
    return this.campaignForm.get('totalHouseholds');
  }

  get totalcontractAmount() {
    return this.campaignForm.get('totalcontractAmount');
  }

  get printOrderID() {
    return this.campaignForm.get('printOrderID');
  }

  get accountName() {
    return this.campaignForm.get('accountName');
  }

  get ownerName() {
    return this.campaignForm.get('ownerName');
  }

  get contactName() {
    return this.campaignForm.get('contactName');
  }

  get attachments() {
    return this.campaignForm.get('attachments');
  }

  addCampaign() {
    const {
      firstDropDate,
      totalCampaignVolume,
      firstDropVolume,
      totalDropsNumber,
      totalHouseholds,
      totalcontractAmount,
      printOrderID,
      accountName,
      ownerName,
      contactName,
      attachments,
    } = this.campaignForm.value;
    const campaignCreationObject = {
      firstDropDate,
      campaignStatus: this.campaignStatusValue,
      campaignType: this.campaignTypeValue,
      firstDropVolume,
      totalCampaignVolume,
      totalDropsNumber,
      mailerSize: this.mailerSizeValue,
      totalHouseholds,
      totalcontractAmount,
      printOrderID,
      accountName,
      ownerName,
      contactName,
      attachments,
    };
    this.campaignService
      .save(campaignCreationObject)
      .pipe(
        this.toast.observe({
          success: 'Campaign saved successfuly',
          loading: 'Saving ...',
          error: 'There was a error',
        })
      )
      .subscribe(() => {
        this.campaignForm.reset();
        this.dialogRef.close();
      });
  }
}
