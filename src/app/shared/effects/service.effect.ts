import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {ApiService} from "../services/api.service";
import {of} from "rxjs/observable/of";
import {catchError, map, mergeMap} from "rxjs/operators";
import {serviceActions} from "../reducers/service.reducer";

@Injectable()
export class serviceEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(serviceActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get('service', action.payload).pipe(
        map(data => ({type: serviceActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: serviceActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) {
  }
}
