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
import { RecordsTableComponent } from './components/common/records-table/records-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { MatNativeDateModule } from '@angular/material/core';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { NewDropComponent } from './components/drop/new-drop/new-drop.component';
import { DropsListComponent } from './components/drop/drops-list/drops-list.component';
import { AngularFireModule } from '@angular/fire/compat';
import { CampaignDetailComponent } from './components/campaign/campaign-detail/campaign-detail.component';
import { DropDetalComponent } from './components/drop/drop-detail/drop-detal.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NewHiatusDatesComponent } from './components/hiatus-dates/new-hiatus-dates/new-hiatus-dates.component';
import { HiatusDatesListComponent } from './components/hiatus-dates/hiatus-dates-list/hiatus-dates-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatSortModule } from '@angular/material/sort';
import { FileUploadLibraryComponent } from './components/file-upload-library/file-upload-library.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserRegisterComponent,
    ZipcodesLookupComponent,
    UsersListComponent,
    RecordsTableComponent,
    ProfileComponent,
    CampaignComponent,
    CampaignListComponent,
    MaxmailDatePickerComponent,
    NewDropComponent,
    DropsListComponent,
    CampaignDetailComponent,
    DropDetalComponent,
    NewHiatusDatesComponent,
    HiatusDatesListComponent,
    DashboardComponent,
    CalendarComponent,
    FileUploadLibraryComponent,
  ],
  imports: [
    BrowserModule,
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
    MatSidenavModule,
    MatDividerModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatSortModule,
    HotToastModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
  ],
  providers: [ScreenTrackingService, UserTrackingService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
