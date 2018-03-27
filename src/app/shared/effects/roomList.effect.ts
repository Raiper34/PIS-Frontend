import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {ApiService} from "../services/api.service";
import {of} from "rxjs/observable/of";
import {catchError, map, mergeMap} from "rxjs/operators";
import {roomListActions} from "../reducers/roomList.reducer";

@Injectable()
export class roomListEffects {

  @Effect() get$: Observable<Action> = this.actions$.pipe(
    ofType(roomListActions.GET_REQUEST),
    mergeMap((action: any) =>
      this.api.get('room').pipe(
        map(data => ({type: roomListActions.GET_SUCCESS, payload: data})),
        catchError(() => of({type: roomListActions.GET_ERROR}))
      )
    )
  );

  constructor(private api: ApiService,
              private actions$: Actions) {
  }
}
