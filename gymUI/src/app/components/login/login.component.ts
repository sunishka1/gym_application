import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  uname: string = '';
  password: string = '';
  radio: string = '';
  errorMessage: string = '';
  constructor(
    private routerService: RouterService,
    private loginService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  submit() {

    const user = {
      username: this.uname,
      password: this.password,
    };
    if (!this.uname || !this.password || !this.radio) {
      this.errorMessage = 'Enter all details';
      return;
    }
    this.errorMessage = '';

    if (this.radio == '1') {
      this.loginService.authenticateCustomer(user).subscribe(
        (data:any) => {
          this.loginService.setBearerToken(data['token']);
          this.routerService.routeToDashboardCustomer();
        },
        (err) => {
          this.errorMessage = err.error.text;
        }
      );
    } else if (this.radio == '2') {
      this.loginService.authenticateAdmin(user).subscribe(
        (data:any) => {
          this.loginService.setBearerToken(data['token']);
          this.routerService.routeToDashboardAdmin();
        },
        (err) => {
          this.errorMessage = err.error.text;
        }
      );
    } else if (this.radio == '3') {
      this.loginService.authenticateMarkTeam(user).subscribe(
        (data:any) => {
          this.loginService.setBearerToken(data['token']);
          this.routerService.routeToDashboardMarkTeam();
        },
        (err) => {
          this.errorMessage = err.error.text;
        }
      );
    }

  }


}
