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

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss']
})
export class ReservationEditComponent implements OnDestroy {

  customerRoomServiceSubscription: Subscription;
  reservationSubscription: Subscription;
  reservation: ReservationModel;
  customerList: PersonModel[] = [];
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

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private toastService: MzToastService,
              private router: Router,
              private api: ApiService,
              private auth: AuthService,
              private route: ActivatedRoute) {
    this.editForm = this.formBuilder.group({
      dateFrom: [moment().unix() * 1000, Validators.required],
      dateTo: [moment().unix() * 1000, Validators.required],
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

    this.store.dispatch({type: customerListActions.GET_REQUEST});
    this.store.dispatch({type: roomListActions.GET_REQUEST});
    this.store.dispatch({type: serviceListActions.GET_REQUEST});
    this.customerRoomServiceSubscription = combineLatest(
      store.pipe(select('customerList')),
      store.pipe(select('roomList')),
      store.pipe(select('serviceList')),
      this.route.params,
    ).subscribe(([customerList, roomList, serviceList, params]) => {
      this.customerList = customerList as PersonModel[];
      this.roomList = roomList as RoomModel[];
      this.serviceList = serviceList as ServiceModel[];
      this.editMode = params && params.id;
      if (params.customer) {
        this.editForm.patchValue({customer: params.customer});
      }
      if (this.editMode && this.customerList.length > 0 && this.roomList.length > 0 && this.serviceList.length > 0) {
        this.isDispatched = true;
        this.store.dispatch({type: reservationActions.GET_REQUEST, payload: params.id});
      }
    });
    this.reservationSubscription = store.pipe(select('reservation')).subscribe((reservation: ReservationModel) => {
      this.reservation = reservation;
      if (this.isDispatched && this.reservation) {
        this.editForm.patchValue({
          ...this.reservation,
          reservedRoom: this.reservation.reservedRoom.id,
          customer: this.reservation.customer.id,
          services: this.reservation.services.map(item => item.id),
        });
      }
    });
  }

  getDaysCount(): number {
    const dateFrom = moment(this.editForm.get('dateFrom').value).startOf('day');
    const dateTo = moment(this.editForm.get('dateTo').value).startOf('day');
    return dateTo.diff(dateFrom, 'days');
  }

  getFinalPrice(): number {
    const reservedRoom = this.roomList.find((item) => item.id == this.editForm.get('reservedRoom').value);
    const pricePerDay = reservedRoom ? reservedRoom.price : 0;
    const servicePrice = this.serviceList.filter((item) => this.editForm.get('services').value.some((value) => value == item.id)).reduce(
      (accumulator, current) => accumulator + current.price, 0);
    return  this.daysCount * pricePerDay + servicePrice;
  }

  submitForm(): void {
    const reservation = {
      ...this.reservation,
      ...this.editForm.getRawValue(),
      dateFrom: moment(this.editForm.get('dateFrom').value).unix() * 1000,
      dateTo: moment(this.editForm.get('dateTo').value).unix() * 1000,
      customer: this.customerList.find((item) => item.id == this.editForm.get('customer').value),
      reservedRoom: this.roomList.find((item) => item.id == this.editForm.get('reservedRoom').value),
      services: this.serviceList.filter((item) => this.editForm.get('services').value.some((value) => value == item.id)),
      creator: this.auth.getActualUser()
    };
    if (this.editMode) {
      this.api.update('reservation', this.reservation.id, reservation).subscribe(
        () => {
          this.toastService.show('Reservation editation successful!', 3000, 'green');
          this.router.navigate(['private/reservation']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    } else {
      this.api.create('reservation', reservation).subscribe(
        () => {
          this.toastService.show('Reservation editation successful!', 3000, 'green');
          this.router.navigate(['private/reservation']);
        },
        (error) => this.toastService.show(error.message, 3000, 'red')
      );
    }
  }

  ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe();
    this.customerRoomServiceSubscription.unsubscribe();
  }

}
