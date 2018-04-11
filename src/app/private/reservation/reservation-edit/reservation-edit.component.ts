import {Component, OnDestroy} from '@angular/core';
import {ReservationModel} from "../../../shared/models/reservation.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppState} from "../../../shared/models/app.state";
import {select, Store} from "@ngrx/store";
import {reservationActions} from "../../../shared/reducers/reservation.reducer";
import {Subscription} from "rxjs/Subscription";
import {RoomModel} from "../../../shared/models/room.model";
import {PersonModel} from "../../../shared/models/person.model";
import {ServiceModel} from "../../../shared/models/service.model";
import {customerListActions} from "../../../shared/reducers/customerList.reducer";
import {roomListActions} from "../../../shared/reducers/roomList.reducer";
import {serviceListActions} from "../../../shared/reducers/serviceList.reducer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {ApiService} from "../../../shared/services/api.service";
import {MzToastService} from "ng2-materialize";
import * as moment from 'moment';
import {combineLatest} from "rxjs/observable/combineLatest";
import {reservationListActions} from "../../../shared/reducers/reservationList.reducer";

/*
 * Reservation Edit Component
 * Contains form to allow editing or creating reservations
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss']
})
export class ReservationEditComponent implements OnDestroy {

  customerRoomServiceSubscription: Subscription;
  reservationSubscription: Subscription;
  reservation: ReservationModel;
  reservationList: ReservationModel[];
  customerList: PersonModel[] = [];
  roomListValue: RoomModel[] = [];
  roomList: RoomModel[] = [];
  serviceList: ServiceModel[] = [];
  editForm: FormGroup;
  editMode = false;
  isDispatched = false;

  daysCount = 0;
  finalPrice = 0;

  paidTypes = [
    {value: false, title: 'No'},
    {value: true, title: 'Yes'},
  ];

  paymentTypes = [
    {value: 'CARD', title: 'Card'},
    {value: 'CASH', title: 'Cash'},
  ];

  /**
   * Constructor with Dependency Injections
   * @param {Store<AppState>} store
   * @param {FormBuilder} formBuilder
   * @param {MzToastService} toastService
   * @param {Router} router
   * @param {ApiService} api
   * @param {AuthService} auth
   * @param {ActivatedRoute} route
   */
  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private toastService: MzToastService,
              private router: Router,
              private api: ApiService,
              private auth: AuthService,
              private route: ActivatedRoute) {
    this.editForm = this.formBuilder.group({
      dateFrom: [moment().startOf('day').unix() * 1000, Validators.required],
      dateTo: [moment().startOf('day').unix() * 1000, Validators.required],
      reservedRoom: [null, Validators.required],
      customer: [null, Validators.required],
      paid: [this.paidTypes[0].value],
      paymentType: [this.paymentTypes[0].value],
      services: [[]],
    });
    this.editForm.valueChanges.subscribe(() => {
      this.daysCount = this.getDaysCount();
      this.finalPrice = this.getFinalPrice();
    });

    this.editForm.get('dateFrom').valueChanges.subscribe(() => this.changeDates());
    this.editForm.get('dateTo').valueChanges.subscribe(() => this.changeDates());

    this.store.dispatch({type: customerListActions.GET_REQUEST});
    this.store.dispatch({type: roomListActions.GET_REQUEST});
    this.store.dispatch({type: serviceListActions.GET_REQUEST});
    this.store.dispatch({type: reservationListActions.GET_REQUEST});
    this.customerRoomServiceSubscription = combineLatest(
      store.pipe(select('customerList')),
      store.pipe(select('roomList')),
      store.pipe(select('serviceList')),
      store.pipe(select('reservationList')),
      this.route.params,
    ).subscribe(([customerList, roomList, serviceList, reservationList, params]) => {
      this.customerList = customerList as PersonModel[];
      this.roomListValue = roomList as RoomModel[];
      this.serviceList = serviceList as ServiceModel[];
      this.reservationList = reservationList as ReservationModel[];
      this.editMode = params && params.id;
      if (this.editMode) { //it is editing
        this.roomList = this.roomListValue;
        this.editForm.get('dateFrom').disable();
        this.editForm.get('dateTo').disable();
        this.editForm.get('reservedRoom').disable();
        this.editForm.get('customer').disable();
      }
      if (params.customer) { //customer provided trought url, so we fill him into form
        this.editForm.patchValue({customer: params.customer});
      }
      if (this.editMode && this.customerList.length > 0 && this.roomList.length > 0 && this.serviceList.length > 0) { //it is edit mode and we obtains all desired data, so we can ask for reservation data
        this.isDispatched = true;
        this.store.dispatch({type: reservationActions.GET_REQUEST, payload: params.id});
      }
    });
    this.reservationSubscription = store.pipe(select('reservation')).subscribe((reservation: ReservationModel) => {
      this.reservation = reservation;
      if (this.isDispatched && this.reservation) { //it was dispatched and data is here too, so it is wanted data
        this.editForm.patchValue({
          ...this.reservation,
          reservedRoom: this.reservation.reservedRoom.id,
          customer: this.reservation.customer.id,
          services: this.reservation.services.map(item => item.id),
        });
      }
    });
  }

  /**
   * Change Dates
   * When dates was chenged, we call this funciton to filter only free roms between theese dates
   */
  changeDates(): void {
    if (this.editMode) { //it is edit mode, so we do not need change free rooms
      return;
    }
    this.editForm.patchValue({reservedRoom: null});
    if (this.roomList && this.reservationList) { //room and reservation list are not empty
      const dateFrom = moment(this.editForm.get('dateFrom').value).startOf('day').add(1, 'seconds');
      const dateTo = moment(this.editForm.get('dateTo').value).startOf('day').subtract(1, 'seconds');
      this.roomList = this.roomListValue.filter(roomItem =>
        this.reservationList
          .filter(reservationItem => reservationItem.reservedRoom.id === roomItem.id)
          .filter(reservationItem =>
            dateFrom.isBetween(reservationItem.dateFrom, reservationItem.dateTo) ||
            dateTo.isBetween(reservationItem.dateFrom, reservationItem.dateTo) ||
            moment(reservationItem.dateFrom).startOf('day').add(1, 'seconds').isBetween(dateFrom.subtract(1, 'seconds'), dateTo.add(1, 'seconds')) ||
            moment(reservationItem.dateTo).startOf('day').add(1, 'seconds').isBetween(dateFrom.subtract(1, 'seconds'), dateTo.add(1, 'seconds'))
          )
          .length === 0
      );
    }
  }

  /**
   * Get Days Count
   * Method to get days between two dates from form
   * @returns {number}
   */
  getDaysCount(): number {
    const dateFrom = moment(this.editForm.get('dateFrom').value).startOf('day');
    const dateTo = moment(this.editForm.get('dateTo').value).startOf('day');
    return dateTo.diff(dateFrom, 'days');
  }

  /**
   * Get Final Price
   * Method to get final price of reservation with all services, nights...
   * @returns {number}
   */
  getFinalPrice(): number {
    const reservedRoom = this.roomList.find((item) => item.id == this.editForm.get('reservedRoom').value);
    const pricePerDay = reservedRoom ? reservedRoom.price : 0;
    const servicePrice = this.serviceList.filter((item) => this.editForm.get('services').value.some((value) => value == item.id)).reduce(
      (accumulator, current) => accumulator + current.price, 0);
    return  this.daysCount * pricePerDay + servicePrice;
  }

  /**
   * Submit Form
   * Send data from form to API and edit or create resource
   */
  submitForm(): void {
    const reservation = {
      ...this.reservation,
      ...this.editForm.getRawValue(),
      dateFrom: moment(this.editForm.get('dateFrom').value).startOf('day').add(1, 'days').unix() * 1000,
      dateTo: moment(this.editForm.get('dateTo').value).startOf('day').add(1, 'days').unix() * 1000,
      customer: this.customerList.find((item) => item.id == this.editForm.get('customer').value),
      reservedRoom: this.roomList.find((item) => item.id == this.editForm.get('reservedRoom').value),
      services: this.serviceList.filter((item) => this.editForm.get('services').value.some((value) => value == item.id)),
      creator: this.auth.getActualUser()
    };
    if (this.editMode) { //we are editing
      this.api.update('reservation', this.reservation.id, reservation).subscribe(
        () => {
          this.toastService.show('Reservation editation successful!', 3000, 'green');
          this.router.navigate(['private/reservation']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    } else { //we are creating
      this.api.create('reservation', reservation).subscribe(
        () => {
          this.toastService.show('Reservation editation successful!', 3000, 'green');
          this.router.navigate(['private/reservation']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    }
  }

  /**
   * Is Password In Password Form Equal
   * Return if password and passwordAgain are equal or not
   * @returns {boolean}
   */
  get isDateToGreaterThanDateFrom(): boolean {
    const dateFrom = moment(this.editForm.get('dateFrom').value).startOf('day').unix();
    const dateTo = moment(this.editForm.get('dateTo').value).startOf('day').unix();
    return dateFrom <= dateTo;
  }

  /**
   * Ng On Destroy
   * Method that is called on component destroy
   */
  ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe();
    this.customerRoomServiceSubscription.unsubscribe();
  }

}
