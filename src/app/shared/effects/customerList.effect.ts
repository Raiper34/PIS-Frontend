import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {ApiService} from "../services/api.service";
import {of} from "rxjs/observable/of";
import {catchError, map, mergeMap} from "rxjs/operators";
import {customerListActions} from "../reducers/customerList.reducer";

@Injectable()
export class customerListEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(customerListActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get('customer').pipe(
        map(data => ({type: customerListActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: customerListActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) {
  }
}
