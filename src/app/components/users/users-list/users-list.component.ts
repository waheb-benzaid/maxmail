import { Component, OnInit } from '@angular/core';
import { UserRegisterComponent } from '../user-register/user-register.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  dialog: any;

  constructor() {}

  ngOnInit(): void {}
  openDialog(): void {
    const dialogRef = this.dialog.open(UserRegisterComponent, {
      width: '250px',
      //data: {name: this.name, animal: this.animal},
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //  // this.animal = result;
    // });
  }
}
