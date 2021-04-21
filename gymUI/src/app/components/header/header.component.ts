import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private routerService:RouterService) { }

  ngOnInit(): void {
  }

  changeToLogin(){
    this.routerService.routeToLogin();
  }
  changeToRegister(){
    this.routerService.routeToRegister();
  }
}
