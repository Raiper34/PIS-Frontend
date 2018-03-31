import {Component, Input, OnInit} from '@angular/core';
import {ReservationModel} from "../../../shared/models/reservation.model";

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss']
})
export class ReservationTableComponent {

  @Input() reservationList: ReservationModel[];

  constructor() { }

}
