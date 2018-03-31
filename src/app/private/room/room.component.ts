import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {roomListActions} from "../../shared/reducers/roomList.reducer";
import {Subscription} from "rxjs/Subscription";
import {RoomModel} from "../../shared/models/room.model";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnDestroy {

  roomListSubscription: Subscription;
  roomListValue: RoomModel[] = [];

  constructor(private store: Store<AppState>) {
    this.roomListSubscription = store.pipe(select('roomList')).subscribe((roomList: RoomModel[]) => {
      this.roomListValue = roomList;
      console.log(roomList);
    });
    this.store.dispatch({type: roomListActions.GET_REQUEST});
  }

  ngOnDestroy(): void {
    this.roomListSubscription.unsubscribe();
  }

}
