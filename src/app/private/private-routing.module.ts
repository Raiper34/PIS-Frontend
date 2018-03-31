import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PrivateComponent} from './private.component';
import {PrivateAuthGuardService} from '../shared/services/private-auth-guard.service';
import {ReservationComponent} from './reservation/reservation.component';
import {RoomComponent} from './room/room.component';
import {ServiceComponent} from "./service/service.component";
import {CustomerComponent} from "./customer/customer.component";
import {EmployeeComponent} from "./employee/employee.component";
import {ReservationDetailComponent} from "./reservation/reservation-detail/reservation-detail.component";
import {RoomDetailComponent} from "./room/room-detail/room-detail.component";
import {ServiceDetailComponent} from "./service/service-detail/service-detail.component";
import {CustomerDetailComponent} from "./customer/customer-detail/customer-detail.component";
import {EmployeeDetailComponent} from "./employee/employee-detail/employee-detail.component";
import {ReservationEditComponent} from "./reservation/reservation-edit/reservation-edit.component";
import {RoomEditComponent} from "./room/room-edit/room-edit.component";
import {ServiceEditComponent} from "./service/service-edit/service-edit.component";
import {CustomerEditComponent} from "./customer/customer-edit/customer-edit.component";
import {EmployeeEditComponent} from "./employee/employee-edit/employee-edit.component";

const privateRoutes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [PrivateAuthGuardService],
    children: [
      {
        path: '',
        children: [
          {path: '', redirectTo: 'reservation', pathMatch: 'full'},
          {path: 'reservation', component: ReservationComponent},
          {path: 'reservation/detail', component: ReservationDetailComponent},
          {path: 'reservation/edit', component: ReservationEditComponent},
          {path: 'reservation/add', component: ReservationEditComponent},
          {path: 'room', component: RoomComponent},
          {path: 'room/detail', component: RoomDetailComponent},
          {path: 'room/edit', component: RoomEditComponent},
          {path: 'room/add', component: RoomEditComponent},
          {path: 'service', component: ServiceComponent},
          {path: 'service/detail', component: ServiceDetailComponent},
          {path: 'service/edit', component: ServiceEditComponent},
          {path: 'service/add', component: ServiceEditComponent},
          {path: 'customer', component: CustomerComponent},
          {path: 'customer/detail', component: CustomerDetailComponent},
          {path: 'customer/edit', component: CustomerEditComponent},
          {path: 'customer/add', component: CustomerEditComponent},
          {path: 'employee', component: EmployeeComponent},
          {path: 'employee/detail', component: EmployeeDetailComponent},
          {path: 'employee/edit', component: EmployeeEditComponent},
          {path: 'employee/add', component: EmployeeEditComponent},
          {path: '**', redirectTo: 'reservation', pathMatch: 'full'},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(privateRoutes)
  ],
  declarations: []
})
export class PrivateRoutingModule { }
