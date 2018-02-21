import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import {PublicRoutingModule} from "./public-routing.module";
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
  ],
  declarations: [PublicComponent, LoginComponent]
})
export class PublicModule { }
