import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MzButtonModule, MzCardModule, MzDropdownModule, MzIconMdiModule, MzIconModule, MzInputModule, MzModalModule,
  MzNavbarModule
} from "ng2-materialize";

@NgModule({
  imports: [
    CommonModule,
    MzButtonModule,
    MzInputModule,
    MzNavbarModule,
    MzInputModule,
    MzCardModule,
    MzIconModule,
    MzIconMdiModule,
    MzModalModule,
    MzDropdownModule,
  ],
  exports: [
    MzButtonModule,
    MzInputModule,
    MzNavbarModule,
    MzInputModule,
    MzCardModule,
    MzIconModule,
    MzIconMdiModule,
    MzModalModule,
    MzDropdownModule,
  ],
  declarations: []
})
export class SharedModule { }
