import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user$ = this.authService.currentUser$;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {}
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

  redirecttoUsersList() {
    this.router.navigate(['/users']);
  }

  redirectToProfilePage() {
    this.router.navigate(['/profile']);
  }

  redirectToCampaignsPage() {
    this.router.navigate(['/campaigns']);
  }

  redirectToDropsPage() {
    this.router.navigate(['/drops']);
  }

  redirectToHiatusDatesPage() {
    this.router.navigate(['/hiatus-dates']);
  }

  currentUserProfile() {
    return this.authService.currentUser$;
  }
}
