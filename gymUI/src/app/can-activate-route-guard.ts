import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authService: AuthenticationService, public routeService: RouterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    )
    : Observable<boolean> | Promise<boolean> | boolean 
    {
      const booleanPromise = this.authService.isUserAuthenticated();

      return booleanPromise.toPromise().then((authenticated:any) => {
        if (!authenticated) {
          this.routeService.routeToLogin();
        }
        return authenticated;
        });
    }
}