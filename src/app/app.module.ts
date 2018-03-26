import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {PublicModule} from "./public/public.module";
import {PrivateModule} from "./private/private.module";
import {AuthGuardService} from "./shared/services/auth-guard.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./shared/services/auth.service";
import {ApiService} from "./shared/services/api.service";
import {reservationListEffects} from "./shared/effects/reservationList.effect";
import {reservationListReducer} from "./shared/reducers/reservationList.reducer";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

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
      reservationList: reservationListReducer,
    }),
    EffectsModule.forRoot([
      reservationListEffects,
    ]),
    PrivateModule,
    PublicModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
