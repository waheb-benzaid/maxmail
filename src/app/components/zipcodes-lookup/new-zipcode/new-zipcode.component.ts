import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { DropService } from 'src/app/services/drop/drop.service';
import { CampaignComponent } from '../../campaign/new-campaign/campaign.component';

@Component({
  selector: 'app-new-zipcode',
  templateUrl: './new-zipcode.component.html',
  styleUrls: ['./new-zipcode.component.css'],
})
export class NewZipcodeComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private toast: HotToastService,
    private dialogRef: MatDialogRef<CampaignComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private router: Router
  ) {}

  actionButton: string = 'Save';
  zipcodeForm = new FormGroup({
    campaignName: new FormControl('', Validators.required),
    firstDropDate: new FormControl('', Validators.required),
  });

  get campaignName() {
    return this.zipcodeForm.get('campaignName');
  }

  get firstDropDate() {
    return this.zipcodeForm.get('firstDropDate');
  }

  addZipcode() {}

  ngOnInit(): void {}
}
