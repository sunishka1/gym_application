import { Component, OnInit } from '@angular/core';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { PackageService } from 'src/app/services/packages.service';
import { Packages } from '../../models/packages';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  programs:Array<Packages> = [];
  constructor(
    private programsService:PackageService,
    private enrolledService:EnrolledService
    ) { 
    this.programsService.fetchFromServer();
    this.enrolledService.fetchEnrolledProgramsFromServer();
  }

  ngOnInit(): void {
    
  }

}
