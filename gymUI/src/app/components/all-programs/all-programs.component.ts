import { Component, OnInit } from '@angular/core';
import { Packages } from 'src/app/models/packages';
import { PackageService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-all-programs',
  templateUrl: './all-programs.component.html',
  styleUrls: ['./all-programs.component.css']
})
export class AllProgramsComponent implements OnInit {

  programs:Packages[] = [];
  constructor(private programsService:PackageService) { }

  ngOnInit(): void {
    this.programsService.getPackage()
    .subscribe(data=>{
      this.programs=data;
    })
  }

}
