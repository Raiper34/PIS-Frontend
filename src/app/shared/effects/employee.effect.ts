import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {ApiService} from "../services/api.service";
import {of} from "rxjs/observable/of";
import {catchError, map, mergeMap} from "rxjs/operators";
import {employeeActions} from "../reducers/employee.reducer";

@Injectable()
export class employeeEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(employeeActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get('room', action.payload).pipe(
        map(data => ({type: employeeActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: employeeActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) {
  }
}
