import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { openForms } from 'src/app/utils/Functions/openForm';
import { DropService } from '../../../services/drop/drop.service';
import { DropDetalComponent } from '../drop-detail/drop-detal.component';
import { NewDropComponent } from '../new-drop/new-drop.component';

@Component({
  selector: 'app-drops-list',
  templateUrl: './drops-list.component.html',
  styleUrls: ['./drops-list.component.css'],
})
export class DropsListComponent implements OnInit {
  isDetailDialog: boolean = false;
  ngOnInit(): void {}
  displayedColumns: string[] = [
    'campaignName',
    'dropName',
    'isLastDrop',
    'isDropCompleted',
    'isSeededReceived',
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
    private campaignService: CampaignService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.getAllDrops();
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

  openDropDialog(data?: string) {
    this.dialog
      .open(NewDropComponent, {
        width: '30%',
        panelClass: 'borderless-dialog',
        data: data,
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllDrops();
      });
  }

  getAllDrops() {
    this.dropService.getAllDrops().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editDrop(row: any) {
    this.openDropDialog(row);
  }

  deleteDrop(id: string) {
    this.dropService.deleteDrop(id).subscribe(() => {
      this.getAllDrops();
    });
  }

  getDropDetail(rowData: any) {
    this.isDetailDialog = true;
    openForms(
      this.dialog,
      DropDetalComponent,
      '30%',
      rowData,
      'borderless-dialog'
    );
  }
}
