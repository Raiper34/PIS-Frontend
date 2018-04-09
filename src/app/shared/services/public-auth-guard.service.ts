import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";

/*
 * Public Auth Guard Service
 * Authguard to handle access to public module
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Injectable()
export class PublicAuthGuardService implements CanActivate {

  /**
   * Constructor with Dependency Injections
   * @param {Router} router
   * @param {AuthService} auth
   */
  constructor(private router: Router, private auth: AuthService) {
  }

  /**
   * Can Activate
   * Return boolean as result that user can access give page or not
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean> | Promise<boolean> | boolean}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLogged = !!this.auth.getAuth();
    if (isLogged) {
      this.router.navigate(['private']);
    }
    return !isLogged;
  }

}
