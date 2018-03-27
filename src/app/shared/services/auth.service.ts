import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {AuthModel} from "../models/auth.model";

@Injectable()
export class AuthService {

  constructor(private api: ApiService) {
    const auth = this.getAuth();
    if (auth) {
      this.setAuth(auth);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.api.create('auth/login', {
      username: username,
      password: password
    }).pipe(tap(data => this.setAuth(data)));
  }

  setAuth(authData: AuthModel): void {
    localStorage.setItem('auth', JSON.stringify(authData));
    this.api.headers = new HttpHeaders({Authorization: `Bearer ${authData.authToken}`});
  }

  getAuth(): AuthModel {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth) : null;
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.api.headers = null;
    //TODO
  }

}
