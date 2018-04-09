import {ReservationModel} from "./reservation.model";
import {PersonModel} from "./person.model";
import {RoomModel} from "./room.model";
import {ServiceModel} from "./service.model";

/*
 * App State
 * Represent whole application state, for reducers
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
export interface AppState {
  customerList: PersonModel[];
  customer: PersonModel;
  employeeList: PersonModel[];
  employee: PersonModel;
  reservationList: ReservationModel[];
  reservation: ReservationModel;
  roomList: RoomModel[];
  room: RoomModel;
  serviceList: ServiceModel[];
  service: ServiceModel;
}
