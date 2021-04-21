import { Component, Input, OnInit } from '@angular/core';
import { EnrolledService } from 'src/app/services/enrolled.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card:any;
  query:string = '';
  constructor(
    private loginService:AuthenticationService,
    private enrollService:EnrolledService
  ) { }

  ngOnInit(): void {
  }
  submitQuery(){
    console.log(this.query);
  }
  enroll(){
    // toggling button
    (<HTMLInputElement> document.getElementById(`btn-2${this.card.id}`)).disabled=false;
    (<HTMLInputElement> document.getElementById(`btn-1${this.card.id}`)).disabled=true;
    

    // backend access
    this.enrollService.enrollProgram(this.card.id,localStorage.getItem("username"));
  }

  disenroll(){
    (<HTMLInputElement> document.getElementById(`btn-1${this.card.id}`)).disabled=false;
    (<HTMLInputElement> document.getElementById(`btn-2${this.card.id}`)).disabled=true;
    this.enrollService.disenrollProgram({programId:this.card.id,username:localStorage.getItem("username")});
  }
}
