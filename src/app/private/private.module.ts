import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import {PrivateRoutingModule} from "./private-routing.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { RoomComponent } from './room/room.component';
import { CustomerComponent } from './customer/customer.component';
import { ReservationComponent } from './reservation/reservation.component';
import { EmployeeComponent } from './employee/employee.component';
import { ServiceComponent } from './service/service.component';
import { RoomDetailComponent } from './room/room-detail/room-detail.component';
import { ServiceDetailComponent } from './service/service-detail/service-detail.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { ReservationDetailComponent } from './reservation/reservation-detail/reservation-detail.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    PrivateComponent,
    RoomComponent,
    CustomerComponent,
    ReservationComponent,
    EmployeeComponent,
    ServiceComponent,
    RoomDetailComponent,
    ServiceDetailComponent,
    EmployeeDetailComponent,
    ReservationDetailComponent,
    CustomerDetailComponent,
  ]
})
export class PrivateModule { }
