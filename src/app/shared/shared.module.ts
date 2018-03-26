import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MzButtonModule, MzCardModule, MzCollectionModule, MzDropdownModule, MzIconMdiModule, MzIconModule, MzInputModule, MzModalModule,
  MzNavbarModule
} from "ng2-materialize";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";

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
    MzCollectionModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
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
    MzCollectionModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
  ],
  declarations: []
})
export class SharedModule { }
