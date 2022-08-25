import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  // user$ = this.userService.currentUserProfile$;
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
