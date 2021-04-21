import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:string = '';
  password:string = '';
  errorMessage:string="";
  createdMessage:String="";
  constructor(
    private registerService:RegisterService,
    private routerService:RouterService
  ) { }

  ngOnInit(): void {
  }

  submit(){

    const user={
      name:this.name,
      password:this.password
    }
    this.createdMessage="";
    if(!this.name || !this.password)
    {
      this.errorMessage="Enter all the details";
      return;
    }
    this.errorMessage="";
    this.registerService.registerUser(user)
    .subscribe(data=>{
      this.createdMessage="User Created, Redirecting to login page in few seconds";
      setTimeout(() => { this.routerService.routeToLogin(); }, 3000);
    },
    err=>{
      this.errorMessage=err.error.text;
    })
    
  }
}
