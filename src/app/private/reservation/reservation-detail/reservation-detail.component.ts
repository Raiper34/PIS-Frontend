import {Component, OnDestroy} from '@angular/core';
import {ReservationModel} from "../../../shared/models/reservation.model";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {AppState} from "../../../shared/models/app.state";
import {reservationActions} from "../../../shared/reducers/reservation.reducer";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnDestroy {

  reservationSubscription: Subscription;
  reservation: ReservationModel;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.reservationSubscription = store.pipe(select('reservation')).subscribe((reservation: ReservationModel) => {
      this.reservation = reservation;
    });
    this.route.params.subscribe(params => {
      this.store.dispatch({type: reservationActions.GET_REQUEST, payload: params.id});
    });
  }

  ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe();
  }

  get totalAmount(): number {
    if (this.reservation) {
      return this.reservation.reservedRoom.price + this.reservation.services.reduce(
        (accumulator, current) => accumulator + current.price, 0);
    }
    return 0;
  }

}
