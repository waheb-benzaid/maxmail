import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() // private authService: AuthenticationService,
  // private router: Router
  {}

  ngOnInit(): void {}

  // logout() {
  //   this.authService.logout().subscribe(() => {
  //     this.router.navigate(['']);
  //   });
  // }

  // redirecttoUsersList() {
  //   this.router.navigate(['/users']);
  // }
}
