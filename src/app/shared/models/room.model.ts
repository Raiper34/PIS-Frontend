/*
 * Room Model
 * Interface for room objects
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 23.4.2018
 */
export interface RoomModel {
  id?: string;
  size: number;
  description: string;
  name: string;
  price: number;
  type: string; //ENUM
  image: string;
  capacity: number;
}
