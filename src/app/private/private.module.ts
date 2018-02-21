import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import {PrivateRoutingModule} from "./private-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    RouterModule,
  ],
  declarations: [PrivateComponent, DashboardComponent]
})
export class PrivateModule { }
