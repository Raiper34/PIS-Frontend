import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ReservationModel} from "../../../shared/models/reservation.model";
import {select, Store} from "@ngrx/store";
import * as moment from "moment";
import {AppState} from "../../../shared/models/app.state";
import {reservationActions} from "../../../shared/reducers/reservation.reducer";
import {RoomModel} from "../../../shared/models/room.model";
import {roomActions} from "../../../shared/reducers/room.reducer";
import {reservationListActions} from "../../../shared/reducers/reservationList.reducer";
import {pageSize} from "../../../shared/components/pagination/pagination.component";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnDestroy {

  roomSubscription: Subscription;
  room: RoomModel;

  reservationListSubscription: Subscription;
  reservationListValue: ReservationModel[] = [];
  reservationListSize = 0;
  currentPage = 0;
  searchString = '';

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private toastService: MzToastService,
              private api: ApiService) {
    this.roomSubscription = store.pipe(select('room')).subscribe((room: RoomModel) => {
      this.room = room;
    });
    this.route.params.subscribe(params => {
      this.store.dispatch({type: roomActions.GET_REQUEST, payload: params.id});
    });

    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
    });
    this.store.dispatch({type: reservationListActions.GET_REQUEST});
  }

  get reservationList(): ReservationModel[] {
    const reservationListValue = this.reservationListValue
      .filter((item) => item.reservedRoom.id == this.room.id)
      .filter((item) => (item.reservedRoom && item.reservedRoom.name.includes(this.searchString)) ||
        (item.customer && item.customer.surname.includes(this.searchString)) ||
        (item.customer && item.customer.firstname.includes(this.searchString))
    );
    this.reservationListSize = reservationListValue.length;
    return reservationListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  deleteRoom(): void {
    this.api.delete('room', this.room.id).subscribe(
      () => {
        this.toastService.show('Deletion successful!', 3000, 'green');
        this.router.navigate(['private/room']);
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  ngOnDestroy(): void {
    this.roomSubscription.unsubscribe();
    this.reservationListSubscription.unsubscribe();
  }

}
