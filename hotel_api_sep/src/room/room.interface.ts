export interface Room {
  id: number;
  name: string;
  reserved: boolean;
  details: string;
  price: number;
  reservationDetails: {
    description: string;
    numberOfDays: number;
    reservationStartDate: Date;
    reservationEndDate: Date;
  } | null;
}
