import {Component, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../shared/models/app.state";
import {ReservationModel} from "../../shared/models/reservation.model";
import {reservationListActions} from "../../shared/reducers/reservationList.reducer";
import {Subscription} from "rxjs/Subscription";
import {pageSize} from "../../shared/components/pagination/pagination.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from "moment";

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
  filterForm: FormGroup;

  /**
   * Constructor with Dependency Injections
   * @param {Store<AppState>} store
   * @param formBuilder
   */
  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      dateFrom: [null],
      dateTo: [null],
      searchString: [''],
    });
    this.filterForm.valueChanges.subscribe(() => {
      this.prepareReservationList();
    });
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
      (item) => (item.reservedRoom && item.reservedRoom.name.includes(this.filterForm.get('searchString').value)) ||
        (item.customer && item.customer.surname.includes(this.filterForm.get('searchString').value)) ||
        (item.customer && item.customer.firstname.includes(this.filterForm.get('searchString').value))
    ).filter((item) => (this.filterForm.get('dateFrom').value ? moment(this.filterForm.get('dateFrom').value).startOf('day') <= moment(item.dateFrom).startOf('day') : true))
      .filter((item) => (this.filterForm.get('dateTo').value ? moment(this.filterForm.get('dateTo').value).startOf('day') >= moment(item.dateTo).startOf('day') : true));
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
   * Ng On Destroy
   * Method that is called on component destroy
   */
  ngOnDestroy(): void {
    this.reservationListSubscription.unsubscribe();
  }

}
