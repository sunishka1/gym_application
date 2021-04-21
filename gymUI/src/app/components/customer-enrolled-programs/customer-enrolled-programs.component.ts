import { Component, OnInit } from '@angular/core';
import { Packages } from '../../models/packages';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { PackageService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-customer-enrolled-programs',
  templateUrl: './customer-enrolled-programs.component.html',
  styleUrls: ['./customer-enrolled-programs.component.css'],
})
export class CustomerEnrolledProgramsComponent implements OnInit {

  ArrayofPrograms:Array<Packages> = [];
  constructor(
    private enrolledService: EnrolledService,
  ) { 
    this.ArrayofPrograms=[];
   }

  ngOnInit(): void {

    // previous code
    this.enrolledService.getEPrograms()
    .subscribe(data=>{
      this.ArrayofPrograms=[];
      this.ArrayofPrograms=data;
    },
    err=>{
      console.log("Error in getting Enrolled Programs");
    })
  }

}
