import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import {PrivateRoutingModule} from "./private-routing.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { RoomComponent } from './room/room.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ServiceComponent } from './service/service.component';
import { RoomDetailComponent } from './room/room-detail/room-detail.component';
import { ServiceDetailComponent } from './service/service-detail/service-detail.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { ReservationTableComponent } from './reservation/reservation-table/reservation-table.component';
import { ReservationEditComponent } from './reservation/reservation-edit/reservation-edit.component';
import { RoomEditComponent } from './room/room-edit/room-edit.component';
import { ServiceEditComponent } from './service/service-edit/service-edit.component';
import { PersonComponent } from './person/person.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonDetailComponent } from './person/person-detail/person-detail.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    PrivateComponent,
    RoomComponent,
    ReservationComponent,
    ServiceComponent,
    RoomDetailComponent,
    ServiceDetailComponent,
    ReservationDetailComponent,
    ReservationTableComponent,
    ReservationEditComponent,
    RoomEditComponent,
    ServiceEditComponent,
    PersonComponent,
    PersonEditComponent,
    PersonDetailComponent,
  ]
})
export class PrivateModule { }
