import { UserRegisterComponent } from '../user-register/user-register.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  ngOnInit(): void {}
  displayedColumns: string[] = ['id', 'full Name', 'Email', 'Is Admin ?'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    const user: User[] = [];
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(user);
  }

  openDialog() {
    this.dialog.open(UserRegisterComponent, {
      height: '400px',
      width: '400px',
      panelClass: 'borderless-dialog',
    });
  }
}
