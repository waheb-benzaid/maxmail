import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { compareDesc } from 'date-fns';
import { Drop } from 'src/app/models/Drop.model';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { openForms } from 'src/app/utils/Functions/openForm';
import { DropService } from '../../../services/drop/drop.service';
import { DropDetalComponent } from '../drop-detail/drop-detal.component';
import { NewDropComponent } from '../new-drop/new-drop.component';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drops-list',
  templateUrl: './drops-list.component.html',
  styleUrls: ['./drops-list.component.css'],
})
export class DropsListComponent implements OnInit, OnDestroy {
  isDetailDialog: boolean = false;
  dropsSubscription!: Subscription;

  ngOnInit(): void {}
  //Filters
  dropListFilters = new FormGroup({
    campaignName: new FormControl(),
    // searchCampaignName: new FormControl('', Validators.required),
    dropDate: new FormControl(),
    dropNumber: new FormControl(),
    dropVolume: new FormControl(),
    isLastDrop: new FormControl(),
    isDropCompleted: new FormControl(),
    isSeededReceived: new FormControl(),
    nextAvailableDates: new FormControl(),
  });

  displayedColumns: string[] = [
    'dropName',
    'campaignStatus',
    'campaignType',
    'dropVolume',
    'isLastDrop',
    'isDropCompleted',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private dropService: DropService,
    private router: Router,
    private toast: HotToastService,
    private campaignService: CampaignService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.dataSource = new MatTableDataSource();
    this.getAllDrops();
  }
  ngOnDestroy(): void {
    this.dropsSubscription.unsubscribe();
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDropDialog(data?: string) {
    openForms(
      this.dialog,
      NewDropComponent,
      '1000px',
      '730px',
      data,
      'borderless-dialog'
    );
  }

  getAllDrops() {
    let drops: Drop[] = [];
    this.dropsSubscription = this.campaignService
      .getAllCampaigns()
      .subscribe((res) => {
        res.forEach((campaign) => {
          campaign.drops.forEach((drop) => {
            drop.campaignStatus = campaign.campaignStatus;
            drop.campaignType = campaign.campaignType;
            drops.push(drop);
          });
        });
        this.dataSource = new MatTableDataSource(drops);
        this.drops = drops;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  editDrop(row: any) {
    console.log(row.campaignId, 'campaignId');

    this.openDropDialog(row);
  }

  deleteDrop(id: string) {
    this.dropService.deleteDrop(id).subscribe(() => {
      this.getAllDrops();
    });
  }

  getDropDetail(rowData: any) {
    this.isDetailDialog = true;
    console.log(rowData, 'data');
    openForms(
      this.dialog,
      DropDetalComponent,
      '1000px',
      '750px',
      rowData,
      'borderless-dialog'
    );
  }

  drops: any[] = [];
  onChangeStatus($event: any) {
    let filtredData = _.filter(this.drops, (item) => {
      return item.campaignStatus.toLowerCase() == $event.value.toLowerCase();
    });
    this.dataSource = new MatTableDataSource(filtredData);
  }

  onChangeType($event: any) {
    let filtredData = _.filter(this.drops, (item) => {
      return item.campaignType.toLowerCase() == $event.value.toLowerCase();
    });
    this.dataSource = new MatTableDataSource(filtredData);
  }

  onChangeOwnerName($event: any) {
    let filtredData = _.filter(this.drops, (item) => {
      return item.ownerName.toLowerCase() == $event.value.toLowerCase();
    });
    this.dataSource = new MatTableDataSource(filtredData);
  }

  //FIXME: make Date Filter works with  {PAST 30 DAYS}
  onChangeDate($event: any) {
    let filtredData = _.filter(this.drops, (item) => {
      return item.createdAt.toLowerCase() == $event.value.toLowerCase();
    });
    this.dataSource = new MatTableDataSource(filtredData);
  }
}
