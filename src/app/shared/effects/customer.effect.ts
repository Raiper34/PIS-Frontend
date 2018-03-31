import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {ApiService} from "../services/api.service";
import {of} from "rxjs/observable/of";
import {catchError, map, mergeMap} from "rxjs/operators";
import {customerActions} from "../reducers/customer.reducer";

@Injectable()
export class customerEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(customerActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get('customer', action.payload).pipe(
        map(data => ({type: customerActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: customerActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) {
  }
}
