import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Campaign } from 'src/app/models/Campaign.model';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { CampaignComponent } from '../new-campaign/campaign.component';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit {
  ngOnInit(): void {}
  displayedColumns: string[] = [
    'id',
    'campaignName',
    'campaignStatus',
    'campaignType',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  allcampaigns: any;
  constructor(
    public dialog: MatDialog,
    private campaignService: CampaignService,
    private router: Router,
    private toast: HotToastService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.getAllCampaigns();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCompaignDialog(data?: string) {
    this.dialog
      .open(CampaignComponent, {
        width: '30%',
        panelClass: 'borderless-dialog',
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllCampaigns();
      });
  }

  getAllCampaigns() {
    return this.campaignService.getAllCampaigns().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return res;
    });
  }

  editCampaign(row: any) {
    this.openCompaignDialog(row);
  }

  deleteCampaign(id: string) {
    this.campaignService.deleteCampaign(id).subscribe(() => {
      this.getAllCampaigns();
    });
  }
}
