import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import {PublicRoutingModule} from "./public-routing.module";
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import {MaterializeModule} from "../shared/materialize/materialize.module";

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [PublicComponent, LoginComponent]
})
export class PublicModule { }
