import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

/*
 * Private Auth Guard Service
 * Authguard to handle access to private module
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Injectable()
export class PrivateAuthGuardService implements CanActivate {

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
    if (!isLogged) {
      this.router.navigate(['public']);
    }
    return isLogged;
  }

}
