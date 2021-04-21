import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MarkteamDashboardComponent } from './components/markteam-dashboard/markteam-dashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { CustomerHeaderComponent } from './components/customer-header/customer-header.component';
import { AllProgramsComponent } from './components/all-programs/all-programs.component';
import { CustomerEnrolledProgramsComponent } from './components/customer-enrolled-programs/customer-enrolled-programs.component';
import { EnrolledCardsComponent } from './components/enrolled-cards/enrolled-cards.component';

import { RouterService } from './services/router.service';
import { PackageService } from './services/packages.service';
import { AuthenticationService } from './services/authentication.service';
import { RegisterService } from './services/register.service';
import { EnrolledService } from './services/enrolled.service';

import { CanActivateRouteGuard } from './can-activate-route-guard';
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    MarkteamDashboardComponent,
    CustomerDashboardComponent,
    HeaderComponent,
    CardComponent,
    CustomerHeaderComponent,
    AllProgramsComponent,
    CustomerEnrolledProgramsComponent,
    EnrolledCardsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    RouterService,
    PackageService,
    AuthenticationService,
    RegisterService,
    EnrolledService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
