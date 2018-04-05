import {Component, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../shared/models/app.state";
import {ReservationModel} from "../../shared/models/reservation.model";
import {reservationListActions} from "../../shared/reducers/reservationList.reducer";
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../../shared/services/api.service";
import {MzToastService} from "ng2-materialize";
import {pageSize} from "../../shared/components/pagination/pagination.component";

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

  constructor(private store: Store<AppState>) {
    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
      this.prepareReservationList();
    });
    this.store.dispatch({type: reservationListActions.GET_REQUEST});
  }

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

  changePage(page: number): void {
    this.currentPage = page;
    this.prepareReservationList();
  }

  searchByString(search: string): void {
    this.searchString = search;
    this.prepareReservationList();
  }

  ngOnDestroy(): void {
    this.reservationListSubscription.unsubscribe();
  }

}
