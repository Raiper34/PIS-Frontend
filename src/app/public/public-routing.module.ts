import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PublicComponent} from './public.component';
import {LoginComponent} from './login/login.component';

const publicRoutes: Routes = [
  {
    path: 'public',
    component: PublicComponent,
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
export class PublicRoutingModule { }
