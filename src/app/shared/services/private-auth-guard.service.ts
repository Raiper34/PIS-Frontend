import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

@Injectable()
export class PrivateAuthGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLogged = !!this.auth.getAuth();
    if (!isLogged) {
      this.router.navigate(['public']);
    }
    return isLogged;
  }

  constructor(private router: Router, private auth: AuthService) { }

}
