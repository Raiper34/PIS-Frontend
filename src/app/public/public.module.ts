import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import {PublicRoutingModule} from "./public-routing.module";
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    SharedModule
  ],
  declarations: [PublicComponent, LoginComponent]
})
export class PublicModule { }
