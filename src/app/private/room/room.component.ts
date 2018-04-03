import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {roomListActions} from "../../shared/reducers/roomList.reducer";
import {Subscription} from "rxjs/Subscription";
import {RoomModel} from "../../shared/models/room.model";
import {pageSize} from "../../shared/components/pagination/pagination.component";
import {ReservationModel} from "../../shared/models/reservation.model";
import {reservationListActions} from "../../shared/reducers/reservationList.reducer";
import {ApiService} from "../../shared/services/api.service";
import {MzToastService} from "ng2-materialize";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnDestroy {

  roomListSubscription: Subscription;
  roomListValue: RoomModel[] = [];
  roomListSize = 0;
  currentPage = 0;
  searchString = '';

  pickedToDeleteRoom: RoomModel;
  isAdmin = false;

  constructor(private store: Store<AppState>,
              private toastService: MzToastService,
              private auth: AuthService,
              private api: ApiService) {
    this.isAdmin = this.auth.getActualUser().role === 'ADMIN';
    this.roomListSubscription = store.pipe(select('roomList')).subscribe((roomList: RoomModel[]) => {
      this.roomListValue = roomList;
    });
    this.store.dispatch({type: roomListActions.GET_REQUEST});
  }

  get roomList(): RoomModel[] {
    const roomListValue = this.roomListValue.filter(
      (item) => item.name.includes(this.searchString)
    );
    this.roomListSize = roomListValue.length;
    return roomListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  ngOnDestroy(): void {
    this.roomListSubscription.unsubscribe();
  }

  deleteRoom(): void {
    this.api.delete('room', this.pickedToDeleteRoom.id).subscribe(
      () => {
        this.store.dispatch({type: roomListActions.GET_REQUEST});
        this.toastService.show('Deletion successful!', 3000, 'green');
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  pickToDelete(room: RoomModel): void {
    this.pickedToDeleteRoom = room;
  }

}
