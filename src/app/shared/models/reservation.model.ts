import {PersonModel} from "./person.model";
import {RoomModel} from "./room.model";
import {ServiceModel} from "./service.model";

export interface ReservationModel {
  id?: number;
  dateFrom: number;
  dateTo: number;
  paid: boolean;
  paymentType: number; //ENUM
  creator?: PersonModel;
  customer?: PersonModel;
  reservedRoom?: RoomModel;
  services?: ServiceModel[];
}
