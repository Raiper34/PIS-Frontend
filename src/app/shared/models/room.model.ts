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
