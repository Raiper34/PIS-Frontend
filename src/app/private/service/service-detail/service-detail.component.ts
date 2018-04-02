import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
  reservationListSize = 0;
  currentPage = 0;
  searchString = '';

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.serviceSubscription = store.pipe(select('service')).subscribe((service: ServiceModel) => {
      this.service = service;
    });
    this.route.params.subscribe(params => {
      this.store.dispatch({type: serviceActions.GET_REQUEST, payload: params.id});
    });

    this.reservationListSubscription = store.pipe(select('reservationList')).subscribe((reservationList: ReservationModel[]) => {
      this.reservationListValue = reservationList;
    });
    this.store.dispatch({type: reservationListActions.GET_REQUEST});
  }

  get reservationList(): ReservationModel[] {
    const reservationListValue = this.reservationListValue
      .filter((item) => item.services.some((serviceItem) => serviceItem.id == this.service.id))
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

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
    this.reservationListSubscription.unsubscribe();
  }

}
