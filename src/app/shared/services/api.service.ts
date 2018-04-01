import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

export const ENDPOINT = 'http://mmarusic.eu:8888';

@Injectable()
export class ApiService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
  }

  get(resource: string, id: string = '', child: string = ''): Observable<Object> {
    return this.http.get(`${ENDPOINT}/${resource}${id ? '/' : ''}${id}${child ? '/' : ''}${child}`, {
      headers: this.headers
    });
  }

  create(resource: string, data: Object): Observable<Object> {
    return this.http.post(`${ENDPOINT}/${resource}`, data, {
      headers: this.headers
    });
  }

  update(resource: string, id: string, data: Object): Observable<Object> {
    return this.http.put(`${ENDPOINT}/${resource}/${id}`, data, {
      headers: this.headers
    });
  }

  delete(resource: string, id: string = ''): Observable<Object> {
    return this.http.delete(`${ENDPOINT}/${resource}${id ? '/' : ''}${id}`, {
      headers: this.headers
    });
  }

}
