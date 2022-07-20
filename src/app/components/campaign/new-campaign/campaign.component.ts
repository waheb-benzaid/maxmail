import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit {
  constructor() {}
  campaignForm = new FormGroup({
    firstDropDate: new FormControl('', Validators.required),
    campaignStatus: new FormControl('', Validators.required),
    campaignType: new FormControl('', [Validators.required, Validators.email]),
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

  ngOnInit(): void {}

  save() {}
}
