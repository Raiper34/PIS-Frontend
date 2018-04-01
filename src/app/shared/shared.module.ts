import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MzButtonModule, MzCardModule, MzCollectionModule, MzDatepickerModule, MzDropdownModule, MzIconMdiModule, MzIconModule, MzInputModule,
  MzModalModule,
  MzNavbarModule, MzSelectModule, MzSidenavModule, MzTextareaModule, MzToastModule, MzToastService
} from "ng2-materialize";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import { PaginationComponent } from './components/pagination/pagination.component';

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
    MzToastModule,
    MzSidenavModule,
    MzDatepickerModule,
    MzSelectModule,
    MzTextareaModule,
    ReactiveFormsModule,
    FormsModule,
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
    MzToastModule,
    MzSidenavModule,
    MzDatepickerModule,
    MzSelectModule,
    MzTextareaModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    PaginationComponent,
  ],
  declarations: [PaginationComponent]
})
export class SharedModule { }
