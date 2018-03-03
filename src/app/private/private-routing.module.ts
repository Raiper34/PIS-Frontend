import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PrivateComponent} from './private.component';
import {AuthGuardService} from '../shared/services/auth-guard.service';
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

const privateRoutes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        children: [
          {path: '', redirectTo: 'reservation', pathMatch: 'full'},
          {path: 'reservation', component: ReservationComponent},
          {path: 'reservation/detail', component: ReservationDetailComponent},
          {path: 'room', component: RoomComponent},
          {path: 'room/detail', component: RoomDetailComponent},
          {path: 'service', component: ServiceComponent},
          {path: 'service/detail', component: ServiceDetailComponent},
          {path: 'customer', component: CustomerComponent},
          {path: 'customer/detail', component: CustomerDetailComponent},
          {path: 'employee', component: EmployeeComponent},
          {path: 'employee/detail', component: EmployeeDetailComponent},
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
