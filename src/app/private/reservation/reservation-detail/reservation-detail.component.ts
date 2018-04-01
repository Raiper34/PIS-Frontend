import {Component, OnDestroy} from '@angular/core';
import {ReservationModel} from "../../../shared/models/reservation.model";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {AppState} from "../../../shared/models/app.state";
import {reservationActions} from "../../../shared/reducers/reservation.reducer";
import {ActivatedRoute, Route, Router} from "@angular/router";
import * as moment from "moment";

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

  get daysCount(): number {
    if (this.reservation) {
      const dateFrom = moment(this.reservation.dateFrom).startOf('day');
      const dateTo = moment(this.reservation.dateTo).startOf('day');
      return dateTo.diff(dateFrom, 'days');
    }
    return 0;
  }

  get totalAmount(): number {
    if (this.reservation) {
      const pricePerDay = this.reservation.reservedRoom ? this.reservation.reservedRoom.price : 0;
      const servicePrice = this.reservation.services.reduce(
        (accumulator, current) => accumulator + current.price, 0);
      return  this.daysCount * pricePerDay + servicePrice;
    }
    return 0;
  }

}
