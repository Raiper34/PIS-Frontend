import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

export const ENDPOINT = 'http://mmarusic.eu:8888';

/*
 * Api Service
 * Service, that allow communicate with API server
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Injectable()
export class ApiService {

  headers: HttpHeaders;

  /**
   * Constructor with Dependency Injections
   * @param {HttpClient} http
   * @param {Router} router
   */
  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Get
   * Get all resource data from servery or specified by id and child
   * @param {string} resource
   * @param {string} id
   * @param {string} child
   * @returns {Observable<Object>}
   */
  get(resource: string, id: string = '', child: string = ''): Observable<Object> {
    return this.http.get(`${ENDPOINT}/${resource}${id ? '/' : ''}${id}${child ? '/' : ''}${child}`, {
      headers: this.headers
    }).pipe(catchError(error => {
      if (error.status == 401) {
        localStorage.removeItem('auth');
        this.router.navigate(['public']);
      }
      return error;
    }));
  }

  /**
   * Create
   * Create new resource on server with given data
   * @param {string} resource
   * @param {Object} data
   * @returns {Observable<Object>}
   */
  create(resource: string, data: Object): Observable<Object> {
    return this.http.post(`${ENDPOINT}/${resource}`, data, {
      headers: this.headers
    });
  }

  /**
   * Update
   * Update existing resource with data on server identified by id
   * @param {string} resource
   * @param {string} id
   * @param {Object} data
   * @returns {Observable<Object>}
   */
  update(resource: string, id: string, data: Object): Observable<Object> {
    return this.http.put(`${ENDPOINT}/${resource}/${id}`, data, {
      headers: this.headers
    });
  }

  /**
   * Delete
   * Delete resource from server by id
   * @param {string} resource
   * @param {string} id
   * @returns {Observable<Object>}
   */
  delete(resource: string, id: string = ''): Observable<Object> {
    return this.http.delete(`${ENDPOINT}/${resource}${id ? '/' : ''}${id}`, {
      headers: this.headers
    });
  }

}
