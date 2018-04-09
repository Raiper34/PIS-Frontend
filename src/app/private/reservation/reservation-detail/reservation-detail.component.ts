import {Component, OnDestroy} from '@angular/core';
import {ReservationModel} from "../../../shared/models/reservation.model";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {AppState} from "../../../shared/models/app.state";
import {reservationActions} from "../../../shared/reducers/reservation.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../../shared/services/api.service";

/*
 * Reservation Detail Component
 * Contains details about reservation
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnDestroy {

  reservationSubscription: Subscription;
  reservation: ReservationModel;
  daysCount = 0;
  totalAmount = 0;

  /**
   * Constructor with Dependency Injections
   * @param {Store<AppState>} store
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {MzToastService} toastService
   * @param {ApiService} api
   */
  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private toastService: MzToastService,
              private api: ApiService) {
    this.reservationSubscription = store.pipe(select('reservation')).subscribe((reservation: ReservationModel) => {
      this.reservation = reservation;
      this.daysCount = this.getDaysCount();
      this.totalAmount = this.getTotalAmount();
    });
    this.route.params.subscribe(params => {
      this.store.dispatch({type: reservationActions.GET_REQUEST, payload: params.id});
    });
  }

  /**
   * Ng On Destroy
   * Method that is called on component destroy
   */
  ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe();
  }

  /**
   * Get Days Count
   * Method to get number of days between date from form
   * @returns {number}
   */
  getDaysCount(): number {
    if (this.reservation) { //if reservation data exist
      const dateFrom = moment(this.reservation.dateFrom).startOf('day');
      const dateTo = moment(this.reservation.dateTo).startOf('day');
      return dateTo.diff(dateFrom, 'days');
    }
    return 0;
  }

  /**
   * Get Total Amount
   * Method to get total price of reservation with all services etc.
   * @returns {number}
   */
  getTotalAmount(): number {
    if (this.reservation) { //if reservationd ata exist
      const pricePerDay = this.reservation.reservedRoom ? this.reservation.reservedRoom.price : 0;
      const servicePrice = this.reservation.services.reduce(
        (accumulator, current) => accumulator + current.price, 0);
      return this.daysCount * pricePerDay + servicePrice;
    }
    return 0;
  }

  /**
   * Delete Reservation
   * Delete current reservation
   */
  deleteReservation(): void {
    this.api.delete('reservation', this.reservation.id).subscribe(
      () => {
        this.toastService.show('Deletion successful!', 3000, 'green');
        this.router.navigate(['private/reservation']);
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

}
