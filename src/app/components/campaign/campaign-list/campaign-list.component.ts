import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Campaign } from 'src/app/models/Campaign.model';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { ZipCodeService } from 'src/app/services/zip-code/zip-code.service';
import { openForms } from 'src/app/utils/Functions/openForm';
import { CampaignDetailComponent } from '../campaign-detail/campaign-detail.component';
import { CampaignComponent } from '../new-campaign/campaign.component';
import * as _ from 'lodash';
import { firstValueFrom, Observable, Subscription, window } from 'rxjs';
import { VolumeDates } from 'src/app/models/VolumeDates.model';
import { DropvolumeDatesService } from 'src/app/services/dropvolume-dates/dropvolume-dates.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    let user$ = this.userService.currentUserProfile$;
    user$.subscribe((res) => {
      console.log(res?.displayName, 'displayed name');
    });

    var today = new Date();
    var priorDate = new Date(new Date().setDate(today.getDate() - 30));

    console.log(today, 'today');
    console.log(priorDate, 'preior dates');
  }
  campaignByIdSubscription!: Subscription;
  campaignDeletedSubscription!: Subscription;
  isDetailDialog = false;
  displayedColumns: string[] = [
    'campaignName',
    'campaignStatus',
    'campaignType',
    'currentDropNumber',
    'totalDropsNumber',
    'campaignDate',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  allcampaigns: any;
  campaigns: any[] = [];
  constructor(
    public dialog: MatDialog,
    private campaignService: CampaignService,
    private zipcodeService: ZipCodeService,
    private dropVolumeDateService: DropvolumeDatesService,
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService
  ) {
    //NOTE: Assign the data to the data source for the table to render
    this.getAllCampaigns();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openCompaignDialog(data?: string) {
    openForms(
      this.dialog,
      CampaignComponent,
      '1000px',
      '800px',
      data,
      'borderless-dialog'
    );
  }

  getCampaignDetail(rowData: any) {
    this.isDetailDialog = true;
    openForms(
      this.dialog,
      CampaignDetailComponent,
      '1000px',
      '800px',
      rowData,
      'borderless-dialog'
    );
  }

  campaignsSubscription!: Subscription;

  getAllCampaigns() {
    // return
    this.campaignsSubscription = this.campaignService
      .getAllCampaigns()
      .subscribe((res) => {
        this.campaigns = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.ngOnInit();
      });
  }

  // getCampaignId(campaignName: string) {
  //   let campaign;
  //   this.campaignService.getAllCampaigns().subscribe((res) => {
  //     res.map((item) => {
  //       campaign = item;
  //     });
  //   });
  //   campaign;
  // }

  editCampaign(rowData: any) {
    this.openCompaignDialog(rowData);
  }

  deleteCampaign(id: string) {
    if (confirm('Are you sure to remove this campaign ?')) {
      this.campaignService.getCampaignById(id).subscribe((res) => {
        if (res) {
          if (res.zipCodeNumbers.length > 0) {
            res.zipCodeNumbers.forEach((zip) => {
              this.zipcodeService.deleteZipcode(zip);
            });
          }
          this.dropVolumeDateService.removeDropVolumeFromCalendar(res);
        }
      });
      this.campaignService.deleteCampaign(id).subscribe(() => {
        this.getAllCampaigns();
      });
    }
  }

  onChangeType($event: any) {
    let filtredData = _.filter(this.campaigns, (item) => {
      return item.campaignType.toLowerCase() == $event.value.toLowerCase();
    });
    this.dataSource = new MatTableDataSource(filtredData);
  }

  onChangeStatus($event: any) {
    let filtredData = _.filter(this.campaigns, (item) => {
      return item.campaignStatus.toLowerCase() == $event.value.toLowerCase();
    });
    this.dataSource = new MatTableDataSource(filtredData);
  }

  onChangeOwnerName($event: any) {
    let filtredData = _.filter(this.campaigns, (item) => {
      return item.ownerName.toLowerCase() == $event.value.toLowerCase();
    });
    this.dataSource = new MatTableDataSource(filtredData);
  }

  //FIXME: make Date Filter works with  {PAST 30 DAYS}
  onChangeDate($event: any) {
    let filtredData = _.filter(this.campaigns, (item) => {
      return item.createdAt.toLowerCase() == $event.value.toLowerCase();
    });
    this.dataSource = new MatTableDataSource(filtredData);
  }

  ngOnDestroy(): void {
    this.campaignsSubscription.unsubscribe();
    if (this.campaignByIdSubscription) {
      this.campaignByIdSubscription.unsubscribe();
    }
    if (this.campaignDeletedSubscription) {
      this.campaignDeletedSubscription.unsubscribe();
    }
  }
}
