export interface ReservationModel {
  id: number;
  dateFrom: number;
  dateTo: number;
  payment: boolean;
  paymentType: number; //ENUM
}
