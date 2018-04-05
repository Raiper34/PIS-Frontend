import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomModel} from "../../../shared/models/room.model";
import {Subscription} from "rxjs/Subscription";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../shared/models/app.state";
import {roomActions} from "../../../shared/reducers/room.reducer";
import {ServiceModel} from "../../../shared/models/service.model";
import {serviceActions} from "../../../shared/reducers/service.reducer";
import {ReservationModel} from "../../../shared/models/reservation.model";
import {reservationListActions} from "../../../shared/reducers/reservationList.reducer";
import {pageSize} from "../../../shared/components/pagination/pagination.component";
import {roomListActions} from "../../../shared/reducers/roomList.reducer";
import {serviceListActions} from "../../../shared/reducers/serviceList.reducer";
import {MzToastService} from "ng2-materialize";
import {ApiService} from "../../../shared/services/api.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnDestroy {

  serviceSubscription: Subscription;
  service: ServiceModel;

  reservationListSubscription: Subscription;
  reservationListValue: ReservationModel[] = [];
  reservationList: ReservationModel[] = [];
  reservationListSize = 0;
  currentPage = 0;
  searchString = '';

  isAdmin = false;
  dispatched = false;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private toastService: MzToastService,
              private api: ApiService) {
    this.isAdmin = this.auth.getActualUser().role === 'ADMIN';
    this.serviceSubscription = store.pipe(select('service')).subscribe((service: ServiceModel) => {
      this.service = service;
      this.dispatched = true;
      this.store.dispatch({type: reservationListActions.GET_REQUEST});
    });
    this.route.params.subscribe(params => {
      this.store.dispatch({type: serviceActions.GET_REQUEST, payload: params.id});
    });

    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
      if (this.dispatched && this.service) {
        this.prepareReservationList();
      }
    });
  }

  prepareReservationList(): void {
    const reservationListValue = this.reservationListValue
      .filter((item) => item.services.some((serviceItem) => serviceItem.id == this.service.id))
      .filter((item) => (item.reservedRoom && item.reservedRoom.name.includes(this.searchString)) ||
        (item.customer && item.customer.surname.includes(this.searchString)) ||
        (item.customer && item.customer.firstname.includes(this.searchString))
      );
    this.reservationListSize = reservationListValue.length;
    this.reservationList = reservationListValue
      .filter((item, index) => index >= this.currentPage * pageSize && index < (this.currentPage * pageSize) + pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.prepareReservationList();
  }

  deleteService(): void {
    this.api.delete('service', this.service.id).subscribe(
      () => {
        this.toastService.show('Deletion successful!', 3000, 'green');
        this.router.navigate(['private/service']);
      },
      (error) => this.toastService.show(error.message, 3000, 'red')
    );
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
    this.reservationListSubscription.unsubscribe();
  }

}
