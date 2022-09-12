import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { openForms } from 'src/app/utils/Functions/openForm';
import { CampaignDetailComponent } from '../campaign-detail/campaign-detail.component';
import { CampaignComponent } from '../new-campaign/campaign.component';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit {
  ngOnInit(): void {}
  isDetailDialog = false;
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
    private campaignService: CampaignService
  ) {
    // Assign the data to the data source for the table to render
    campaignService.getAllCampaignsNames();
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

  openCompaignDialog(data?: string, width: string = '30%') {
    openForms(this.dialog, CampaignComponent, '30%', data, 'borderless-dialog');
  }

  getCampaignDetail(rowData: any) {
    this.isDetailDialog = true;
    openForms(
      this.dialog,
      CampaignDetailComponent,
      '30%',
      rowData,
      'borderless-dialog'
    );
  }

  getAllCampaigns() {
    return this.campaignService.getAllCampaigns().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.ngOnInit();
    });
  }

  getCampaignId(campaignName: string) {
    let campaign;
    this.campaignService.getAllCampaigns().subscribe((res) => {
      res.map((item) => {
        campaign = item;
      });
    });
    campaign;
  }

  editCampaign(rowData: any) {
    this.openCompaignDialog(rowData);
  }

  deleteCampaign(id: string) {
    this.campaignService.deleteCampaign(id).subscribe(() => {
      this.getAllCampaigns();
    });
  }
}
