import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PublicComponent} from './public.component';
import {LoginComponent} from './login/login.component';
import {PublicAuthGuardService} from "../shared/services/public-auth-guard.service";

/*
 * Public Routing Module
 * Defines public module routes and routing
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
const publicRoutes: Routes = [
  {
    path: 'public',
    component: PublicComponent,
    canActivate: [PublicAuthGuardService],
    children: [
      {
        path: '',
        children: [
          {path: '', redirectTo: 'login', pathMatch: 'full'},
          {path: '**', redirectTo: 'login', pathMatch: 'full'},
          {path: 'login', component: LoginComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(publicRoutes)
  ],
  declarations: []
})
export class PublicRoutingModule {
}
