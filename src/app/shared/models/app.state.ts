import {ReservationModel} from "./reservation.model";
import {PersonModel} from "./person.model";
import {RoomModel} from "./room.model";
import {ServiceModel} from "./service.model";

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
