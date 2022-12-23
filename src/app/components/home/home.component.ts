import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user$ = this.userService.currentUserProfile$;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public userService: UserService,
    private breakPointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {}
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

  openProfile() {
    this.router.navigate(['home/profile']);
  }

  ngAfterViewInit() {
    this.breakPointObserver.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  currentUserProfile() {
    return this.authService.currentUser$;
  }
}
