import {Component, OnDestroy} from '@angular/core';
import {AppState} from "../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {roomListActions} from "../../shared/reducers/roomList.reducer";
import {Subscription} from "rxjs/Subscription";
import {RoomModel} from "../../shared/models/room.model";
import {pageSize} from "../../shared/components/pagination/pagination.component";
import {ApiService} from "../../shared/services/api.service";
import {MzToastService} from "ng2-materialize";
import {AuthService} from "../../shared/services/auth.service";

/*
 * Room Component
 * Show room table
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnDestroy {

  roomListSubscription: Subscription;
  roomListValue: RoomModel[] = [];
  roomList: RoomModel[] = [];
  roomListSize = 0;
  currentPage = 0;
  searchString = '';

  sort = {
    by: 'name',
    direction: 'asc',
  };

  pickedToDeleteRoom: RoomModel;
  isAdmin = false;

  /**
   * Constructor with Dependency Injection
   * @param {Store<AppState>} store
   * @param {MzToastService} toastService
   * @param {AuthService} auth
   * @param {ApiService} api
   */
  constructor(private store: Store<AppState>,
              private toastService: MzToastService,
              private auth: AuthService,
              private api: ApiService) {
    this.isAdmin = this.auth.getActualUser().role === 'ADMIN';
    this.roomListSubscription = store.pipe(select('roomList')).subscribe((roomList: RoomModel[]) => {
      this.roomListValue = roomList;
      this.prepareRoomList();
    });
    this.store.dispatch({type: roomListActions.GET_REQUEST});
  }

  /**
   * Prepare Room List
   * Transform original data into data that are paginated, sorted and filtered
   */
  prepareRoomList(): void {
    const roomListValue = this.roomListValue.filter(
      (item) => item.name.includes(this.searchString)
    );
    this.roomListSize = roomListValue.length;
    this.roomList = roomListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize)
      .sort((item1, item2) => this.sortItems(item1, item2));
  }

  /**
   * Change Page
   * Change Page of table and filter data
   * @param {number} page
   */
  changePage(page: number): void {
    this.currentPage = page;
    this.prepareRoomList();
  }

  /**
   * Search String
   * Set searching string and filter data
   * @param {string} search
   */
  searchByString(search: string): void {
    this.searchString = search;
    this.prepareRoomList();
  }

  /**
   * Ng On Destroy
   * Method that is called on component destroy
   */
  ngOnDestroy(): void {
    this.roomListSubscription.unsubscribe();
  }

  /**
   * Delete Room
   * Delete picked room
   */
  deleteRoom(): void {
    this.api.delete('room', this.pickedToDeleteRoom.id).subscribe(
      () => {
        this.store.dispatch({type: roomListActions.GET_REQUEST});
        this.toastService.show('Deletion successful!', 3000, 'green');
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  /**
   * Pick To Delete
   * Pick room to delete
   * @param {RoomModel} room
   */
  pickToDelete(room: RoomModel): void {
    this.pickedToDeleteRoom = room;
  }

  /**
   * Set Sort
   * Set Sort object and filter data
   * @param {string} by
   * @param {string} direction
   */
  setSort(by: string, direction: string): void {
    this.sort = {by, direction};
    this.prepareRoomList();
  }

  /**
   * Sort Items
   * Method for sorting function
   * @param {RoomModel} item1
   * @param {RoomModel} item2
   * @returns {number}
   */
  sortItems(item1: RoomModel, item2: RoomModel): number {
    if (this.sort.direction === 'asc') { //sort ascending
      return item1[this.sort.by] > item2[this.sort.by] ? 1 : item2[this.sort.by] > item1[this.sort.by] ? -1 : 0;
    } else { //sort descending
      return item1[this.sort.by] < item2[this.sort.by] ? 1 : item2[this.sort.by] < item1[this.sort.by] ? -1 : 0;
    }
  }

}
