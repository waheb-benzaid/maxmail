import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CampaignListComponent } from './components/campaign/campaign-list/campaign-list.component';
import { DropsListComponent } from './components/drop/drops-list/drops-list.component';
import { HiatusDatesListComponent } from './components/hiatus-dates/hiatus-dates-list/hiatus-dates-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ZipcodesLookupComponent } from './components/zipcodes-lookup/zipcodes-lookup-list/zipcodes-lookup.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: 'users',
        component: UsersListComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'profile',
        component: ProfileComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'campaigns',
        component: CampaignListComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'drops',
        component: DropsListComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'hiatus-dates',
        component: HiatusDatesListComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'zip-codes',
        component: ZipcodesLookupComponent,
        ...canActivate(redirectUnauthorizedToLogin),
      },
    ],
  },

  {
    path: 'new-user',
    component: UserRegisterComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
