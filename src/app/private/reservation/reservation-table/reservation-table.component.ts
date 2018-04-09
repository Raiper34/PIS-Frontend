import {Component, Input} from '@angular/core';
import {ReservationModel} from "../../../shared/models/reservation.model";
import {reservationListActions} from "../../../shared/reducers/reservationList.reducer";
import {Store} from "@ngrx/store";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../../shared/services/api.service";
import {AppState} from "../../../shared/models/app.state";

/*
 * Reservation Table Component
 * Represent reservation table
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss']
})
export class ReservationTableComponent {

  reservationListOriginal: ReservationModel[];
  reservationListSorted: ReservationModel[];
  pickedToDeleteReservation: ReservationModel;

  sort = {
    by: 'dateCreated',
    direction: 'desc',
  };

  /**
   * Constructor with Dependency Injectons
   * @param {Store<AppState>} store
   * @param {MzToastService} toastService
   * @param {ApiService} api
   */
  constructor(private store: Store<AppState>,
              private toastService: MzToastService,
              private api: ApiService) {
  }

  /**
   * Reservation List
   * Setter for setting reservation list with given data
   * @param {ReservationModel[]} reservationList
   */
  @Input()
  set reservationList(reservationList: ReservationModel[]) {
    this.reservationListOriginal = reservationList;
    this.reservationListSorted = this.reservationListOriginal;
  }

  /**
   * Delete Reservation
   * Delete picked reservation
   */
  deleteReservation(): void {
    this.api.delete('reservation', this.pickedToDeleteReservation.id).subscribe(
      () => {
        this.store.dispatch({type: reservationListActions.GET_REQUEST});
        this.toastService.show('Deletion successful!', 3000, 'green');
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  /**
   * Change Paid Status
   * Change paid statu fo reservation
   * @param {ReservationModel} reservation
   */
  changePaidStatus(reservation: ReservationModel): void {
    this.api.update('reservation', reservation.id, {
      ...reservation,
      paid: !reservation.paid,
    }).subscribe(
      () => {
        this.store.dispatch({type: reservationListActions.GET_REQUEST});
        this.toastService.show('Changing paid status successful!', 3000, 'green');
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  /**
   * Pick To Delete
   * Pick reservation to delete
   * @param {ReservationModel} reservation
   */
  pickToDelete(reservation: ReservationModel): void {
    this.pickedToDeleteReservation = reservation;
  }

  /**
   * Set Sort
   * Set sort object and filter data
   * @param {string} by
   * @param {string} direction
   */
  setSort(by: string, direction: string): void {
    this.sort = {by, direction};
    this.reservationListSorted = this.reservationListOriginal.sort((item1, item2) => this.sortItems(item1, item2));
  }

  /**
   * Sort Items
   * Method for sorting funciton
   * @param {ReservationModel} item1
   * @param {ReservationModel} item2
   * @returns {number}
   */
  sortItems(item1: ReservationModel, item2: ReservationModel): number {
    if (this.sort.direction === 'asc') { //sort ascending
      return item1[this.sort.by] > item2[this.sort.by] ? 1 : item2[this.sort.by] > item1[this.sort.by] ? -1 : 0;
    } else { //sort descending
      return item1[this.sort.by] < item2[this.sort.by] ? 1 : item2[this.sort.by] < item1[this.sort.by] ? -1 : 0;
    }
  }

}
