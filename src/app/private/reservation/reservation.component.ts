import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../shared/models/app.state";
import {ReservationModel} from "../../shared/models/reservation.model";
import {reservationListActions} from "../../shared/reducers/reservationList.reducer";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnDestroy {

  reservationListSubscription: Subscription;
  reservationListValue: ReservationModel[] = [];

  constructor(private store: Store<AppState>) {
    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
    });
    this.store.dispatch({type: reservationListActions.GET_REQUEST});
  }

  ngOnDestroy(): void {
    this.reservationListSubscription.unsubscribe();
  }

}
