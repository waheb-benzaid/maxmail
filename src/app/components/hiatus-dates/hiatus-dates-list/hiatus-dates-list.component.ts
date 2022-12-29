import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { HiatusDatesService } from 'src/app/services/hiatus-dates/hiatus-dates.service';
import { openForms } from 'src/app/utils/Functions/openForm';
import { NewHiatusDatesComponent } from '../new-hiatus-dates/new-hiatus-dates.component';

@Component({
  selector: 'app-hiatus-dates-list',
  templateUrl: './hiatus-dates-list.component.html',
  styleUrls: ['./hiatus-dates-list.component.css'],
})
export class HiatusDatesListComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.getHiatusDates();
  }
  isDetailDialog = false;
  displayedColumns: string[] = [
    'hiatusDate',
    'hiatusDateDescription',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private hiatusDateService: HiatusDatesService
  ) {
    // Assign the data to the data source for the table to render
  }
  ngOnDestroy(): void {
    this.hiatusDateSubscription.unsubscribe();
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

  hiatusDateSubscription!: Subscription;
  getHiatusDates() {
    this.hiatusDateSubscription = this.hiatusDateService
      .getHiatusDates()
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      });
  }

  openHiatusDateDialog(data?: string) {
    openForms(
      this.dialog,
      NewHiatusDatesComponent,
      '500px',
      '500px',
      data,
      'borderless-dialog'
    );
  }

  editHiatusDates(data?: any) {
    this.openHiatusDateDialog(data);
  }

  removeHiatusDate(id: string) {
    if (confirm('Are you sure to remove this hiatus date ?')) {
      this.hiatusDateService
        .deleteHiatusDate(id)
        .pipe()
        .subscribe((res) => {
          this.getHiatusDates();
        });
    }
  }
}
