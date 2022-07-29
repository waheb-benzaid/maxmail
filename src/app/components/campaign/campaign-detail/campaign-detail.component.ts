import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign } from 'src/app/models/Campaign.model';
import { formatDate } from '../../../utils/format-date';
import { CampaignComponent } from '../new-campaign/campaign.component';
campaignsNames: [] = [];

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css'],
})
export class CampaignDetailComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private toast: HotToastService,
    private dialogRef: MatDialogRef<CampaignComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private datePipe: DatePipe
  ) {
    campaignService.getAllCampaigns();
  }
  actionButton: string = 'Save';
  campaignDetail = new FormGroup({
    campaignName: new FormControl({ disable: true }),
    firstDropDate: new FormControl({ disable: true }),
    campaignStatus: new FormControl({ disable: true }),
    campaignType: new FormControl({ disable: true }),
    firstDropVolume: new FormControl({ disable: true }),
    totalCampaignVolume: new FormControl({ disable: true }),
    totalDropsNumber: new FormControl({ disable: true }),
    mailerSize: new FormControl({ disable: true }),
    totalHouseholds: new FormControl({ disable: true }),
    totalcontractAmount: new FormControl({ disable: true }),
    printOrderID: new FormControl({ disable: true }),
    accountName: new FormControl({ disable: true }),
    ownerName: new FormControl({ disable: true }),
    contactName: new FormControl({ disable: true }),
    attachments: new FormControl({ disable: true }),
  });
  ngOnInit(): void {
    if (this.editData) {
      this.actionButton = 'Edit';
      this.campaignDetail.controls['campaignName'].setValue(
        this.editData.campaignName
      );
      this.campaignDetail.controls['firstDropDate'].setValue(
        this.editData.firstDropDate
      );
      this.campaignDetail.controls['campaignStatus'].setValue(
        this.editData.campaignStatus
      );
      this.campaignDetail.controls['campaignType'].setValue(
        this.editData.campaignType
      );
      this.campaignDetail.controls['firstDropVolume'].setValue(
        this.editData.firstDropVolume
      );
      this.campaignDetail.controls['totalCampaignVolume'].setValue(
        this.editData.totalCampaignVolume
      );
      this.campaignDetail.controls['totalDropsNumber'].setValue(
        this.editData.totalDropsNumber
      );
      this.campaignDetail.controls['mailerSize'].setValue(
        this.editData.mailerSize
      );
      this.campaignDetail.controls['totalHouseholds'].setValue(
        this.editData.totalHouseholds
      );
      this.campaignDetail.controls['totalcontractAmount'].setValue(
        this.editData.totalcontractAmount
      );
      this.campaignDetail.controls['printOrderID'].setValue(
        this.editData.printOrderID
      );
      this.campaignDetail.controls['accountName'].setValue(
        this.editData.accountName
      );
      this.campaignDetail.controls['ownerName'].setValue(
        this.editData.ownerName
      );
      this.campaignDetail.controls['contactName'].setValue(
        this.editData.contactName
      );
      this.campaignDetail.controls['attachments'].setValue(
        this.editData.attachments
      );
    }
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
    } = this.campaignDetail.value;
    const campaignObject = {
      id: '',
      campaignName,
      firstDropDate: formatDate(firstDropDate, this.datePipe),
      campaignStatus,
      campaignType,
      firstDropVolume,
      totalCampaignVolume,
      totalDropsNumber,
      mailerSize,
      totalHouseholds,
      totalcontractAmount,
      printOrderID,
      accountName,
      ownerName,
      contactName,
      attachments,
      drops: [],
    };
    return campaignObject;
  }

  addCampaign() {
    if (!this.editData) {
      this.campaignService
        .saveCampaign(this.getCampaignObject())
        .pipe(
          this.toast.observe({
            success: 'Campaign saved successfuly',
            loading: 'Saving ...',
            error: 'There was a error',
          })
        )
        .subscribe(() => {
          this.campaignDetail.reset();
          this.dialogRef.close('save');
        });
      return;
    }
    this.updateCampaign(this.editData.id);
  }

  updateCampaign(id: string) {
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
        this.campaignDetail.reset();
        this.dialogRef.close('update');
      });
  }
  displayCampaignDetails(id: string) {
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
        this.campaignDetail.reset();
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
