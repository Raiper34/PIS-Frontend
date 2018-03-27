import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../shared/models/app.state";
import {ReservationModel} from "../../shared/models/reservation.model";
import {reservationListActions} from "../../shared/reducers/reservationList.reducer";
import {Subscription} from "rxjs/Subscription";
import {ApiService} from "../../shared/services/api.service";
import {MzToastService} from "ng2-materialize";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnDestroy {

  reservationListSubscription: Subscription;
  reservationListValue: ReservationModel[] = [];
  reservationListSize = 0;
  pages = [];
  pageSize = 10;
  currentPage = 0;

  constructor(private store: Store<AppState>,
              private toastService: MzToastService,
              private api: ApiService) {
    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
    });
    this.store.dispatch({type: reservationListActions.GET_REQUEST});
  }

  get reservationList(): ReservationModel[] {
    const reservationListValue = this.reservationListValue;
    this.reservationListSize = this.reservationListValue.length;
    this.pages = Array(Math.ceil(this.reservationListSize / this.pageSize), 10).fill(1).map((x, y) => x + y)
    return reservationListValue
      .filter((item, index) => index >= this.currentPage * this.pageSize && index < (this.currentPage * this.pageSize) + this.pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  deleteReservation(id: string): void {
    this.api.delete('reservation', id).subscribe(
      () => {
        this.store.dispatch({type: reservationListActions.GET_REQUEST});
        this.toastService.show('Delete successful!', 3000, 'green');
        },
      () => this.toastService.show('Delete error!', 3000, 'green')
    );
  }

  ngOnDestroy(): void {
    this.reservationListSubscription.unsubscribe();
  }

}
