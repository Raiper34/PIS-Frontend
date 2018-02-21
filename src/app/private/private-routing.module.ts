import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PrivateComponent} from './private.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const privateRoutes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    children: [
      {
        path: '',
        children: [
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          { path: 'dashboard', component: DashboardComponent },
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
