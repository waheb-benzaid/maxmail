import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-drop-detal',
  templateUrl: './drop-detal.component.html',
  styleUrls: ['./drop-detal.component.css'],
})
export class DropDetalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public editData: any) {}
  actionButton: string = 'Save';
  dropDetail = new FormGroup({
    dropDate: new FormControl({ disable: true }),
    dropName: new FormControl({ disable: true }),
    campaignStatus: new FormControl({ disable: true }),
    campaignType: new FormControl({ disable: true }),
    dropVolume: new FormControl({ disable: true }),
    dropNumber: new FormControl({ disable: true }),
    seededReceived: new FormControl({ disable: true }),
    campaignName: new FormControl({ disable: true }),
    mailerSize: new FormControl({ disable: true }),
    printOrderID: new FormControl({ disable: true }),
    contactName: new FormControl({ disable: true }),
    accountName: new FormControl({ disable: true }),
    isLastDrop: new FormControl({ disable: true }),
    isDropCompleted: new FormControl({ disable: true }),
    attachments: new FormControl({ disable: true }),
  });
  dropDate!: string;
  ngOnInit(): void {
    this.dropDetail.controls['dropDate'].setValue(this.editData.dropDate);
    this.dropDetail.controls['dropName'].setValue(this.editData.dropName);
    this.dropDetail.controls['dropNumber'].setValue(this.editData.dropNumber);
    this.dropDetail.controls['dropVolume'].setValue(this.editData.dropVolume);
    this.dropDetail.controls['seededReceived'].setValue(
      this.editData.seededReceived
    );
    this.dropDetail.controls['isLastDrop'].setValue(this.editData.isLastDrop);
    this.dropDetail.controls['isDropCompleted'].setValue(
      this.editData.isDropCompleted
    );
    this.dropDetail.controls['campaignName'].setValue(
      this.editData.campaignName
    );
    this.dropDetail.controls['campaignStatus'].setValue(
      this.editData.campaignStatus
    );
    this.dropDetail.controls['campaignType'].setValue(
      this.editData.campaignType
    );
    this.dropDetail.controls['mailerSize'].setValue(this.editData.mailerSize);
    this.dropDetail.controls['printOrderID'].setValue(
      this.editData.printOrderID
    );
    this.dropDetail.controls['contactName'].setValue(this.editData.contactName);
    this.dropDetail.controls['accountName'].setValue(this.editData.accountName);
    this.dropDetail.controls['attachments'].setValue(this.editData.attachments);
    this.dropDate = new Date(this.editData.dropDate).toLocaleDateString();
  }
}
