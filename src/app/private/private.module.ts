import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import {PrivateRoutingModule} from "./private-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {MaterializeModule} from "../shared/materialize/materialize.module";

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [PrivateComponent, DashboardComponent]
})
export class PrivateModule { }
