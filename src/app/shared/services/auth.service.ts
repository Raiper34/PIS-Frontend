import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  constructor(private api: ApiService) { }

  login(username: string, password: string): Observable<any> {
    return this.api.create('auth/login', {
      username: username,
      password: password
    }).pipe(tap(data => this.api.headers = new HttpHeaders({
      'Authorization': data.authToken,
    })));
  }

  register(): void {
    this.api.create('auth/login', {
      username: 'todo',
      password: 'todo'
    });
  }

  logout(): void {
    //TODO
  }

}
