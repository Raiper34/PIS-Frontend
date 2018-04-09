import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

/*
 * Role Guard Service
 * Guard to handle access to page by user role
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Injectable()
export class RoleGuardService implements CanActivate{

  /**
   * Can Activate
   * Return boolean as result that user can access give page or not
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean> | Promise<boolean> | boolean}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.auth.getActualUser();
    if (user.role !== 'ADMIN') {
      this.router.navigate(['private']);
    }
    return user.role === 'ADMIN';
  }

  /**
   * Constructor with Dependency Ibjections
   * @param {Router} router
   * @param {AuthService} auth
   */
  constructor(private router: Router, private auth: AuthService) { }

}
