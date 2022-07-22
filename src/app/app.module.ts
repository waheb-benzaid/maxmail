import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { ZipcodesLookupComponent } from './components/zipcodes-lookup/zipcodes-lookup.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { RecordsTableComponent } from './components/common/records-table/records-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FirestoreModule,
  provideFirestore,
  getFirestore,
} from '@angular/fire/firestore';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { ProfileComponent } from './components/profile/profile.component';
import { CampaignComponent } from './components/campaign/new-campaign/campaign.component';
import { CampaignListComponent } from './components/campaign/campaign-list/campaign-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaxmailDatePickerComponent } from './components/common/maxmail-date-picker/maxmail-date-picker.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { MatSelectModule } from '@angular/material/select';
import { MY_DATE_FORMATS } from './date-formats';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserRegisterComponent,
    ZipcodesLookupComponent,
    UsersListComponent,
    NavBarComponent,
    RecordsTableComponent,
    ProfileComponent,
    CampaignComponent,
    CampaignListComponent,
    MaxmailDatePickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    FirestoreModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSelectModule,
    HotToastModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
