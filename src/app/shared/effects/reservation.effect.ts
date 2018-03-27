import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {reservationListActions} from "../reducers/reservationList.reducer";
import {ApiService} from "../services/api.service";
import {of} from "rxjs/observable/of";
import {catchError, map, mergeMap} from "rxjs/operators";
import {reservationActions} from "../reducers/reservation.reducer";

@Injectable()
export class reservationEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(reservationActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get('reservation', action.payload).pipe(
        map(data => ({type: reservationActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: reservationActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) {
  }
}
