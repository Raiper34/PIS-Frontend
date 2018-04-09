import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {ApiService} from "../services/api.service";
import {of} from "rxjs/observable/of";
import {catchError, map, mergeMap} from "rxjs/operators";
import {serviceListActions} from "../reducers/serviceList.reducer";

/*
 * Service List Effects
 * Side effects of reducer to handle and process requests to API
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
@Injectable()
export class serviceListEffects {

  /**
   * Effect to catch dispatches and make any side effect like api call
   * @type {Observable<any>}
   */
  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(serviceListActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get('service').pipe(
        map(data => ({type: serviceListActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: serviceListActions.GET_ERROR}))
      )
    )
  );

  /**
   * Constructor with Dependency Injections
   * @param {ApiService} api
   * @param {Actions} actions$
   */
  constructor(private api: ApiService,
              private actions$: Actions) {
  }
}
