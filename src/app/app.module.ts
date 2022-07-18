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
import { CompaignComponent } from './components/mail-compaign/compaign/compaign.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { DropComponent } from './components/compaign-drop/drop/drop.component';
import { ZipcodesLookupComponent } from './components/zipcodes-lookup/zipcodes-lookup.component';
import { DropsCalendarComponent } from './components/drops-calendar/drops-calendar.component';
import { CompaignsComponent } from './components/mail-compaign/compaigns/compaigns.component';
import { DropsComponent } from './components/compaign-drop/drops/drops.component';
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
import { FirestoreModule } from '@angular/fire/firestore';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CompaignComponent,
    UserRegisterComponent,
    DropComponent,
    ZipcodesLookupComponent,
    DropsCalendarComponent,
    CompaignsComponent,
    DropsComponent,
    UsersListComponent,
    NavBarComponent,
    RecordsTableComponent,
    ProfileComponent,
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    MatMenuModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    FirestoreModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
