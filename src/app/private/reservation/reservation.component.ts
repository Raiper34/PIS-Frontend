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
  reservationListSize = 0;
  currentPage = 0;
  searchString = '';

  constructor(private store: Store<AppState>,
              private toastService: MzToastService,
              private api: ApiService) {
    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
    });
    this.store.dispatch({type: reservationListActions.GET_REQUEST});
  }

  get reservationList(): ReservationModel[] {
    const reservationListValue = this.reservationListValue.filter(
      (item) => item.reservedRoom.name.includes(this.searchString) ||
        item.customer.surname.includes(this.searchString) ||
        item.customer.firstname.includes(this.searchString)
    );
    this.reservationListSize = reservationListValue.length;
    return reservationListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  ngOnDestroy(): void {
    this.reservationListSubscription.unsubscribe();
  }

}
