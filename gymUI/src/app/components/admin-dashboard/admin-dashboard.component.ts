import { Component, OnInit } from '@angular/core';
import { Packages } from 'src/app/models/packages';
import { PackageService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  pck: Packages;
  errMessage: string = '';

  constructor(private packagesService:PackageService) {
    this.pck = new Packages();
   }

  ngOnInit(): void {
  }

  addPackages(){
    if( this.pck.price !== null && this.pck.duration !=='' ){
      this.packagesService.addPackage(this.pck).subscribe(
        data => {},
        err => {
          this.errMessage = err.message;
        }
      );

      this.pck = new Packages();
    }

    else{
      this.errMessage = 'Package price cannot be null and duration cannot be an empty field';
    }
  }

}
