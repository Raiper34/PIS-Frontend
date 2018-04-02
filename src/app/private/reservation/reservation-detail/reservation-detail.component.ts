import {Component, OnDestroy} from '@angular/core';
import {ReservationModel} from "../../../shared/models/reservation.model";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {AppState} from "../../../shared/models/app.state";
import {reservationActions} from "../../../shared/reducers/reservation.reducer";
import {ActivatedRoute, Route, Router} from "@angular/router";
import * as moment from "moment";
import {reservationListActions} from "../../../shared/reducers/reservationList.reducer";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnDestroy {

  reservationSubscription: Subscription;
  reservation: ReservationModel;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private toastService: MzToastService,
              private api: ApiService) {
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

  deleteReservation(): void {
    this.api.delete('reservation', this.reservation.id).subscribe(
      () => {
        this.toastService.show('Delete successful!', 3000, 'green');
        this.router.navigate(['private/reservation']);
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

}
