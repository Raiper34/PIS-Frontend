import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {ApiService} from "../services/api.service";
import {of} from "rxjs/observable/of";
import {catchError, map, mergeMap} from "rxjs/operators";
import {employeeListActions} from "../reducers/employeeList.reducer";

@Injectable()
export class employeeListEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(employeeListActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get('employee').pipe(
        map(data => ({type: employeeListActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: employeeListActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) {
  }
}
