import {Component, Input, OnInit} from '@angular/core';
import {ReservationModel} from "../../../shared/models/reservation.model";
import {reservationListActions} from "../../../shared/reducers/reservationList.reducer";
import {Store} from "@ngrx/store";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../../shared/services/api.service";
import {AppState} from "../../../shared/models/app.state";

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss']
})
export class ReservationTableComponent {

  @Input() reservationList: ReservationModel[];
  pickedToDeleteReservation: ReservationModel;

  constructor(private store: Store<AppState>,
              private toastService: MzToastService,
              private api: ApiService) { }

  deleteReservation(): void {
    this.api.delete('reservation', this.pickedToDeleteReservation.id).subscribe(
      () => {
        this.store.dispatch({type: reservationListActions.GET_REQUEST});
        this.toastService.show('Delete successful!', 3000, 'green');
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  pickToDelete(reservation: ReservationModel): void {
    this.pickedToDeleteReservation = reservation;
  }

}
