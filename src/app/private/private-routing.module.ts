import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PrivateComponent} from './private.component';
import {PrivateAuthGuardService} from '../shared/services/private-auth-guard.service';
import {ReservationComponent} from './reservation/reservation.component';
import {RoomComponent} from './room/room.component';
import {ServiceComponent} from "./service/service.component";
import {ReservationDetailComponent} from "./reservation/reservation-detail/reservation-detail.component";
import {RoomDetailComponent} from "./room/room-detail/room-detail.component";
import {ServiceDetailComponent} from "./service/service-detail/service-detail.component";
import {ReservationEditComponent} from "./reservation/reservation-edit/reservation-edit.component";
import {RoomEditComponent} from "./room/room-edit/room-edit.component";
import {ServiceEditComponent} from "./service/service-edit/service-edit.component";
import {PersonDetailComponent} from "./person/person-detail/person-detail.component";
import {PersonEditComponent} from "./person/person-edit/person-edit.component";
import {PersonComponent} from "./person/person.component";
import {RoleGuardService} from "../shared/services/role-guard.service";

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
          {path: 'reservation/detail/:id', component: ReservationDetailComponent},
          {path: 'reservation/edit/:id', component: ReservationEditComponent},
          {path: 'reservation/add', component: ReservationEditComponent},
          {path: 'room', component: RoomComponent},
          {path: 'room/detail/:id', component: RoomDetailComponent},
          {path: 'room/edit/:id', component: RoomEditComponent, canActivate: [RoleGuardService]},
          {path: 'room/add', component: RoomEditComponent, canActivate: [RoleGuardService]},
          {path: 'service', component: ServiceComponent},
          {path: 'service/detail/:id', component: ServiceDetailComponent},
          {path: 'service/edit/:id', component: ServiceEditComponent, canActivate: [RoleGuardService]},
          {path: 'service/add', component: ServiceEditComponent, canActivate: [RoleGuardService]},
          {path: 'customer', component: PersonComponent, data: {type: 'customer'}},
          {path: 'customer/detail/:id', component: PersonDetailComponent, data: {type: 'customer'}},
          {path: 'customer/edit/:id', component: PersonEditComponent, data: {type: 'customer'}},
          {path: 'customer/add', component: PersonEditComponent, data: {type: 'customer'}},
          {path: 'employee', component: PersonComponent, data: {type: 'employee'}, canActivate: [RoleGuardService]},
          {path: 'employee/detail/:id', component: PersonDetailComponent, data: {type: 'employee'}, canActivate: [RoleGuardService]},
          {path: 'employee/edit/:id', component: PersonEditComponent, data: {type: 'employee'}, canActivate: [RoleGuardService]},
          {path: 'employee/add', component: PersonEditComponent, data: {type: 'employee'}, canActivate: [RoleGuardService]},
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
