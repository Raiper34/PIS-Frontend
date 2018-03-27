import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PublicAuthGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLogged = !!this.auth.getAuth();
    if (isLogged) {
      this.router.navigate(['private']);
    }
    return !isLogged;
  }

  constructor(private router: Router, private auth: AuthService) { }

}
