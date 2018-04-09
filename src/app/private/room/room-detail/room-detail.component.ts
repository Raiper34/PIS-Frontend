import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ReservationModel} from "../../../shared/models/reservation.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../shared/models/app.state";
import {RoomModel} from "../../../shared/models/room.model";
import {roomActions} from "../../../shared/reducers/room.reducer";
import {reservationListActions} from "../../../shared/reducers/reservationList.reducer";
import {pageSize} from "../../../shared/components/pagination/pagination.component";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../../shared/services/api.service";
import {AuthService} from "../../../shared/services/auth.service";

/*
 * Room Detail Component
 * Provides detail information of room
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
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
  reservationList: ReservationModel[] = [];
  reservationListSize = 0;
  currentPage = 0;
  searchString = '';

  isAdmin = false;
  dispatched = false;

  /**
   * Constructor with Dependency Injections
   * @param {Store<AppState>} store
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {MzToastService} toastService
   * @param {AuthService} auth
   * @param {ApiService} api
   */
  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private toastService: MzToastService,
              private auth: AuthService,
              private api: ApiService) {
    this.isAdmin = this.auth.getActualUser().role === 'ADMIN';
    this.roomSubscription = store.pipe(select('room')).subscribe((room: RoomModel) => {
      this.room = room;
      this.dispatched = true;
      this.store.dispatch({type: reservationListActions.GET_REQUEST});
    });
    this.route.params.subscribe(params => {
      this.store.dispatch({type: roomActions.GET_REQUEST, payload: params.id});
    });

    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
      if (this.dispatched && this.room) { //it was dispatched so it is wanted data
        this.prepareReservationList();
      }
    });
  }

  /**
   * Prepare Reservation List
   * Transform original reservation data into data that are paginated, sorted and filtered
   */
  prepareReservationList(): void {
    const reservationListValue = this.reservationListValue
      .filter((item) => item.reservedRoom.id == this.room.id)
      .filter((item) => (item.reservedRoom && item.reservedRoom.name.includes(this.searchString)) ||
        (item.customer && item.customer.surname.includes(this.searchString)) ||
        (item.customer && item.customer.firstname.includes(this.searchString))
    );
    this.reservationListSize = reservationListValue.length;
    this.reservationList = reservationListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  /**
   * Change Page
   * Cgange reservations table page
   * @param {number} page
   */
  changePage(page: number): void {
    this.currentPage = page;
    this.prepareReservationList();
  }

  /**
   * Delete Room
   * Delete current room
   */
  deleteRoom(): void {
    this.api.delete('room', this.room.id).subscribe(
      () => {
        this.toastService.show('Deletion successful!', 3000, 'green');
        this.router.navigate(['private/room']);
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  /**
   * Ng On Destroy
   * Method that is called on component destroy
   */
  ngOnDestroy(): void {
    this.roomSubscription.unsubscribe();
    this.reservationListSubscription.unsubscribe();
  }

}
