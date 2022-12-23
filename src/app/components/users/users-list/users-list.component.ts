import { UserRegisterComponent } from '../user-register/user-register.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/User.model';
import { RecordsTableService } from 'src/app/services/common/records-table/records-table.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  ngOnInit(): void {
    this.getallUsers();
  }
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'role',
    'action',
  ];
  dataSource: MatTableDataSource<UserModel>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    recordsTableService: RecordsTableService
  ) {
    const user: UserModel[] = [];
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(user);
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  usersSubscription!: Subscription;
  getallUsers() {
    this.usersSubscription = this.userService.getAllUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.ngOnInit();
    });
  }

  openUserDialog() {
    this.dialog.open(UserRegisterComponent, {
      height: '550px',
      width: '540px',
      panelClass: 'borderless-dialog',
    });
  }
}
