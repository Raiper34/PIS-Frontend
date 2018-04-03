import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class RoleGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.auth.getActualUser();
    if (user.role !== 'ADMIN') {
      this.router.navigate(['private']);
    }
    return user.role === 'ADMIN';
  }

  constructor(private router: Router, private auth: AuthService) { }

}
