import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {AuthModel} from "../models/auth.model";
import {PersonModel} from "../models/person.model";

/*
 * Auth Service
 * Service that provides methods to work with login, logout and get current loggedin user
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Injectable()
export class AuthService {

  /**
   * Constructor with Dependency Injection
   * @param {ApiService} api
   */
  constructor(private api: ApiService) {
    const auth = this.getAuth();
    if (auth) {
      this.setAuth(auth);
    }
  }

  /**
   * Login
   * Login user with given username and password
   * @param {string} username
   * @param {string} password
   * @returns {Observable<any>}
   */
  login(username: string, password: string): Observable<any> {
    return this.api.create('auth/login', {
      username: username,
      password: password
    }).pipe(tap(data => this.setAuth(data)));
  }

  /**
   * Set Auth
   * Set authentification data to headers and to localstorage
   * @param {AuthModel} authData
   */
  setAuth(authData: AuthModel): void {
    localStorage.setItem('auth', JSON.stringify(authData));
    this.api.headers = new HttpHeaders({Authorization: `Bearer ${authData.authToken}`});
  }

  /**
   * Get Auth
   * Get authetification data from localstorage
   * @returns {AuthModel}
   */
  getAuth(): AuthModel {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth) : null;
  }

  /**
   * Get Actual User
   * Get current exisitn logged in user
   * @returns {PersonModel}
   */
  getActualUser(): PersonModel {
    const auth = this.getAuth();
    if (auth) {
      return auth.user;
    }
    return null;
  }

  /**
   * Logout
   * Logout already signedin user
   * @returns {Observable<any>}
   */
  logout(): Observable<any> {
    return this.api.get('auth/logout').pipe(tap(() => {
      localStorage.removeItem('auth');
      this.api.headers = null;
    }));
  }

}
