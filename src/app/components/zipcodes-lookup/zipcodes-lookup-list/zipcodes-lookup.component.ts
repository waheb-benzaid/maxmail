import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { ZipCodeService } from 'src/app/services/zip-code/zip-code.service';
import { openForms } from 'src/app/utils/Functions/openForm';

@Component({
  selector: 'app-zipcodes-lookup',
  templateUrl: './zipcodes-lookup.component.html',
  styleUrls: ['./zipcodes-lookup.component.css'],
})
export class ZipcodesLookupComponent implements OnInit, OnDestroy {
  isDetailDialog = false;
  displayedColumns: string[] = [
    'zipNumber',
    'accountName',
    'campaignStatus',
    'unavailablePostCard',
    'unavailableMagazine',
    'unavailableExternalMail',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private zipCodeService: ZipCodeService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.getAllZipCodes();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
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

  openCompaignDialog(data?: string) {
    openForms(
      this.dialog,
      ZipcodesLookupComponent,
      '1000px',
      '800px',
      data,
      'borderless-dialog'
    );
  }

  getAllZipCodes() {
    return this.zipCodeService.getAllZipcodes().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.ngOnInit();
    });
  }
  ngOnDestroy() {
    this.getAllZipCodes().unsubscribe();
  }
}
