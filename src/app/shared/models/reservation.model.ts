import {PersonModel} from "./person.model";
import {RoomModel} from "./room.model";
import {ServiceModel} from "./service.model";

/*
 * Reservation Model
 * Interface for reservation models
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
export interface ReservationModel {
  id?: string;
  dateCreated: number;
  dateFrom: number;
  dateTo: number;
  paid: boolean;
  paymentType: number; //ENUM
  creator?: PersonModel;
  customer?: PersonModel;
  reservedRoom?: RoomModel;
  services?: ServiceModel[];
}
