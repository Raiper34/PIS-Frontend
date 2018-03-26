import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {reservationListActions} from "../reducers/reservationList.reducer";
import {ApiService} from "../services/api.service";
import {of} from "rxjs/observable/of";
import {catchError, map, mergeMap, tap,} from "rxjs/operators";

@Injectable()
export class reservationListEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(reservationListActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get('reservation').pipe(
        map(data => ({type: reservationListActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: reservationListActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) {
  }
}