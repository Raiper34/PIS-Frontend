import {Component, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../shared/models/app.state";
import {ReservationModel} from "../../shared/models/reservation.model";
import {reservationListActions} from "../../shared/reducers/reservationList.reducer";
import {Subscription} from "rxjs/Subscription";
import {pageSize} from "../../shared/components/pagination/pagination.component";

/*
 * Reservation Component
 * Contians table of reservations
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnDestroy {

  reservationListSubscription: Subscription;
  reservationListValue: ReservationModel[] = [];
  reservationList: ReservationModel[] = [];
  reservationListSize = 0;
  currentPage = 0;
  searchString = '';

  /**
   * Constructor with Dependency Injections
   * @param {Store<AppState>} store
   */
  constructor(private store: Store<AppState>) {
    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
      this.prepareReservationList();
    });
    this.store.dispatch({type: reservationListActions.GET_REQUEST});
  }

  /**
   * Prepare Reservation List
   * Transform original data into data thar are paginated, sorted and filtered
   */
  prepareReservationList(): void {
    const reservationListValue = this.reservationListValue.filter(
      (item) => (item.reservedRoom && item.reservedRoom.name.includes(this.searchString)) ||
        (item.customer && item.customer.surname.includes(this.searchString)) ||
        (item.customer && item.customer.firstname.includes(this.searchString))
    );
    this.reservationListSize = reservationListValue.length;
    this.reservationList = reservationListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  /**
   * Change Page
   * Change Page of reservations table and filter data
   * @param {number} page
   */
  changePage(page: number): void {
    this.currentPage = page;
    this.prepareReservationList();
  }

  /**
   * Search By String
   * Set search string and filter data
   * @param {string} search
   */
  searchByString(search: string): void {
    this.searchString = search;
    this.prepareReservationList();
  }

  /**
   * Ng On Destroy
   * Method that is called on component destroy
   */
  ngOnDestroy(): void {
    this.reservationListSubscription.unsubscribe();
  }

}
