import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {roomListActions} from "../../shared/reducers/roomList.reducer";
import {Subscription} from "rxjs/Subscription";
import {RoomModel} from "../../shared/models/room.model";
import {pageSize} from "../../shared/components/pagination/pagination.component";

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

  constructor(private store: Store<AppState>) {
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

}
