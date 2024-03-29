import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {PublicModule} from "./public/public.module";
import {PrivateModule} from "./private/private.module";
import {PrivateAuthGuardService} from "./shared/services/private-auth-guard.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./shared/services/auth.service";
import {ApiService} from "./shared/services/api.service";
import {reservationListEffects} from "./shared/effects/reservationList.effect";
import {reservationListReducer} from "./shared/reducers/reservationList.reducer";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {PublicAuthGuardService} from "./shared/services/public-auth-guard.service";
import {customerListReducer} from "./shared/reducers/customerList.reducer";
import {employeeListReducer} from "./shared/reducers/employeeList.reducer";
import {roomListReducer} from "./shared/reducers/roomList.reducer";
import {serviceListReducer} from "./shared/reducers/serviceList.reducer";
import {serviceListEffects} from "./shared/effects/serviceList.effect";
import {roomListEffects} from "./shared/effects/roomList.effect";
import {employeeListEffects} from "./shared/effects/employeeList.effect";
import {customerListEffects} from "./shared/effects/customerList.effect";
import {customerReducer} from "./shared/reducers/customer.reducer";
import {employeeReducer} from "./shared/reducers/employee.reducer";
import {reservationReducer} from "./shared/reducers/reservation.reducer";
import {roomReducer} from "./shared/reducers/room.reducer";
import {serviceReducer} from "./shared/reducers/service.reducer";
import {customerEffects} from "./shared/effects/customer.effect";
import {employeeEffects} from "./shared/effects/employee.effect";
import {reservationEffects} from "./shared/effects/reservation.effect";
import {roomEffects} from "./shared/effects/room.effect";
import {serviceEffects} from "./shared/effects/service.effect";
import {RoleGuardService} from "./shared/services/role-guard.service";

const appRoutes: Routes = [
  {path: '', redirectTo: 'public', pathMatch: 'full'},
  {path: '**', redirectTo: 'public', pathMatch: 'full'},
  {path: 'private', children: [{path: '', component: PrivateModule}]},
  {path: 'public', children: [{path: '', component: PublicModule}]},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    StoreModule.forRoot({
      customerList: customerListReducer,
      employeeList: employeeListReducer,
      reservationList: reservationListReducer,
      roomList: roomListReducer,
      serviceList: serviceListReducer,
      customer: customerReducer,
      employee: employeeReducer,
      reservation: reservationReducer,
      room: roomReducer,
      service: serviceReducer,
    }),
    EffectsModule.forRoot([
      customerListEffects,
      employeeListEffects,
      reservationListEffects,
      roomListEffects,
      serviceListEffects,
      customerEffects,
      employeeEffects,
      reservationEffects,
      roomEffects,
      serviceEffects,
    ]),
    PrivateModule,
    PublicModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    PrivateAuthGuardService,
    PublicAuthGuardService,
    RoleGuardService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
