import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzButtonModule, MzCardModule, MzInputModule, MzNavbarModule} from "ng2-materialize";

@NgModule({
  imports: [
    CommonModule,
    MzButtonModule,
    MzInputModule,
    MzNavbarModule,
    MzInputModule,
    MzCardModule
  ],
  exports: [
    MzButtonModule,
    MzInputModule,
    MzNavbarModule,
    MzInputModule,
    MzCardModule
  ],
  declarations: []
})
export class MaterializeModule { }
